import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { ContactsFilterPipe } from '../contacts-filter.pipe';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ContactItemComponent, ContactsFilterPipe],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit, OnDestroy {
  @Input() contacts: Contact[] = [];
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  subscription!: Subscription;
  term: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe((contactsList: Contact[]) => {
        this.contacts = contactsList;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }

  search(value: string) {
    this.term = value;
  }
}

