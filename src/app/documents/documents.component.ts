import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentListComponent } from './document-list/document-list.component';
import { Document } from './document.model';
import { DocumentService } from './document.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, DocumentListComponent, RouterModule],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocument!: Document;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documentService.documentSelectedEvent.subscribe((document: Document) => {
      this.selectedDocument = document;
    });
  }
}
