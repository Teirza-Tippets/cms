import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  private contacts: Contact[] = [];
  private maxContactId: number;

  constructor(private http: HttpClient) {}

  getContacts() {
    this.http
      .get<{ message: string, contacts: Contact[] }>('http://localhost:3000/contacts')
      .subscribe(
        (response) => {
          this.contacts = response.contacts || [];
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  getContact(id: string): Contact | null {
    return this.contacts.find(contact => contact.id === id) || null;
  }

  addContact(newContact: Contact) {
    if (!newContact) return;

    newContact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
      newContact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.contacts.push(responseData.contact);
          this.contacts.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        () => {
          this.contacts[pos] = newContact;
          this.contacts.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }

  deleteContact(contact: Contact) {
    if (!contact) return;

    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) return;

    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        () => {
          this.contacts.splice(pos, 1);
          this.contacts.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}