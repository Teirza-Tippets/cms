import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-document-detail',
  standalone: true,
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
  imports: [RouterModule]
})
export class DocumentDetailComponent {
  @Input() document!: Document;
}
