import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent {
  page = 4;
  page2 = 1;
  currentPage = 3;

  constructor(private modalService: NgbModal) {}

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
