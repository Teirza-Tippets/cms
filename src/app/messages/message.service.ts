import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor(private http: HttpClient) { 
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    this.http
      .get<Message[]>('https://tippetscms-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages || [];
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
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.storeMessages();
  }

  storeMessages() {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http
      .put(
        'https://tippetscms-default-rtdb.firebaseio.com/messages.json',
        JSON.stringify(this.messages),
        { headers }
      )
      .subscribe(() => {
        this.messageChangedEvent.emit(this.messages.slice());
      });
  }

  fetchMessages() {
    this.http
      .get<Message[]>(
        'https://tippetscms-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe(messages => {
        this.messages = messages || [];
        this.messageChangedEvent.emit(this.messages.slice());
      });
  }

  maxMessageId: number = 0;

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
