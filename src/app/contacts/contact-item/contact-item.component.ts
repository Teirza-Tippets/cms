import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-contact-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {
  @Input() contact!: Contact;
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  onSelected() {
    this.selectedContactEvent.emit(this.contact);
  }
}
