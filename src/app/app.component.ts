import { Component } from '@angular/core';
import { HeaderComponent } from './header.component'; // adjust path if needed
import { ContactsComponent } from './contacts/contacts.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ContactsComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
