import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageEditComponent } from '../message-edit/message-edit.component';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule, MessageItemComponent, MessageEditComponent],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages = [
    { id: '1', subject: 'Hello', msgText: 'How are you?', sender: 'John' },
    { id: '2', subject: 'Meeting', msgText: 'Let’s meet tomorrow.', sender: 'Jane' }
  ];
}
