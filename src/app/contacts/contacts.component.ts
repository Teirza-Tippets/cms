import { Component } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { Contact } from './contact.model'; 
@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ContactListComponent, ContactDetailComponent],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  contacts = [
    new Contact(
      '1',
      'R. Kent Jackson',
      'jacksonk@byui.edu',
      '208-496-3771',
      '../../assets/images/jacksonk.jpg',
      null
    ),
    new Contact(
      '2',
      'Rex Barzee',
      'barzeer@byui.edu',
      '208-496-3768',
      '../../assets/images/barzeer.jpg',
      null
    )
  ];
  selectedContact = this.contacts[0];
}
