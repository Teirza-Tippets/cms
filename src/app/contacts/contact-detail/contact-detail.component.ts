import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact.model'; // adjust path as needed

@Component({
  selector: 'cms-contact-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  contacts: Contact[] = [
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
}
