import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ContactListComponent, ContactDetailComponent],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent {}

