import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  contacts = [];
}

