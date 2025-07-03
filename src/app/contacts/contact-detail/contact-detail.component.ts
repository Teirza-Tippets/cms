import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { ContactService } from '../contact.service';
@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ContactListComponent],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | null = null;
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.contact = this.contactService.getContact(id);
    });
  }
}
