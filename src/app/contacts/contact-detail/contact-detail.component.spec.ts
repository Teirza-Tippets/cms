import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactDetailComponent } from "./contact-detail.component";

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  imports: [ContactDetailComponent]
})
export class ContactDetailComponent {
  contact: Contact | undefined ;
}
