import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule, DocumentItemComponent],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  documents: Document[] = [
    new Document('1', 'Doc 1', ' Description 1', ' http://example.com/1', null),
    new Document('2', 'Doc 2', ' Description 2', ' http://example.com/2', null),
    new Document('3', 'Doc 3', ' Description 3', ' http://example.com/3', null),
    new Document('4', 'Doc 4', ' Description 4', ' http://example.com/4', null),
    new Document('5', 'Doc 5', ' Description 5', ' http://example.com/5', null)
  ];

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
