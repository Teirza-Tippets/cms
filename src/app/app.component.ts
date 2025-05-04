import { Component } from '@angular/core';
import { ContactsComponent } from './contacts/contacts.component';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContactsComponent, HeaderComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
