import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { PostNewJobComponent } from './post-new-job/post-new-job.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { JobListComponent } from './job-list/job-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterLink } from '@angular/router';
import { AddJobComponent } from './add-job/add-job.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [AllJobsComponent, PostNewJobComponent, JobListComponent],
  imports: [
    MatAutocompleteModule,
    MatInputModule,
    CKEditorModule,
    CommonModule,
    JobRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    NgScrollbarModule,
    RouterLink,
    AddJobComponent,
  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class JobModule {}
