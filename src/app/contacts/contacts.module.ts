import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

@NgModule({
  declarations: [
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent
  ],
  imports: [CommonModule],
  exports: [ContactsComponent]
})
export class ContactsModule {}
