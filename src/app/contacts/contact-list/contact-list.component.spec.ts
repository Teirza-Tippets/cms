import { Component } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent {
search(arg0: string) {
throw new Error('Method not implemented.');
}
  contacts: Contact[] = [
    new Contact(
      "1", "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771",
      "../../assets/images/jacksonk.jpg", null
    ),
    new Contact(
      "2", "Rex Barzee", "barzeer@byui.edu", "208-496-3768",
      "../../assets/images/barzeer.jpg", null
    )
  ];
}
