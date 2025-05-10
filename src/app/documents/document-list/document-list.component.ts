import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentItemComponent } from '../document-item/document-item.component';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule, DocumentItemComponent],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  documents = [
    { id: '1', name: 'Document 1', description: 'Description 1', url: 'url1', children: null },
    { id: '2', name: 'Document 2', description: 'Description 2', url: 'url2', children: null }
  ];
}
