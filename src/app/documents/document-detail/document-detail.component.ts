import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';
@Component({
  selector: 'app-document-detail',
  standalone: true,
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
  imports: [RouterModule],
  providers: [WindRefService],
})
export class DocumentDetailComponent {
  document?: Document;
  nativeWindow: any;
  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private windRefService: WindRefService
  ) {}
  ngOnInit() {
    this.nativeWindow = this.windRefService.getNativeWindow();
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.document = this.documentService.getDocument(id) ?? undefined;
    });
  }
  onView() {
    if (this.document && this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }
  onDelete() {
    this.documentService.deleteDocument(this.document!);
    this.router.navigate(['/documents']);
  }
}
