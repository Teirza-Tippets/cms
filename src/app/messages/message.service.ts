import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number = 0;

  constructor(private http: HttpClient) {}

  getMessages() {
    this.http
      .get<{ message: string, messages: Message[] }>('http://localhost:3000/messages')
      .subscribe(
        (response) => {
          this.messages = response.messages || [];
          this.maxMessageId = this.getMaxId();
          this.messages.sort((a, b) => a.subject < b.subject ? -1 : a.subject > b.subject ? 1 : 0);
          this.messageChangedEvent.emit(this.messages.slice());
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  getMessage(id: string): Message | null {
    return this.messages.find(message => message.id === id) || null;
  }

  addMessage(message: Message) {
    if (!message) return;

    message.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<{ message: string, messageObj: Message }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.messageObj);
          this.messages.sort((a, b) => a.subject < b.subject ? -1 : a.subject > b.subject ? 1 : 0);
          this.messageChangedEvent.emit(this.messages.slice());
        }
      );
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) return;

    const pos = this.messages.findIndex(m => m.id === originalMessage.id);
    if (pos < 0) return;

    newMessage.id = originalMessage.id;
    newMessage._id = originalMessage._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('http://localhost:3000/messages/' + originalMessage.id,
      newMessage, { headers: headers })
      .subscribe(
        () => {
          this.messages[pos] = newMessage;
          this.messages.sort((a, b) => a.subject < b.subject ? -1 : a.subject > b.subject ? 1 : 0);
          this.messageChangedEvent.emit(this.messages.slice());
        }
      );
  }

  deleteMessage(message: Message) {
    if (!message) return;

    const pos = this.messages.findIndex(m => m.id === message.id);
    if (pos < 0) return;

    this.http.delete('http://localhost:3000/messages/' + message.id)
      .subscribe(
        () => {
          this.messages.splice(pos, 1);
          this.messages.sort((a, b) => a.subject < b.subject ? -1 : a.subject > b.subject ? 1 : 0);
          this.messageChangedEvent.emit(this.messages.slice());
        }
      );
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
