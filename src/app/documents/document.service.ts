import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient) {}

  getDocuments() {
    this.http
      .get<{ message: string, documents: Document[] }>('http://localhost:3000/documents')
      .subscribe(response => {
        this.documents = response.documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.error(error);
      });
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getDocument(id: string): Document | null {
    return this.documents.find(doc => doc.id === id) || null;
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.documents.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.documents.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.documents.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }
}
