import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { PostNewJobComponent } from './post-new-job/post-new-job.component';
import { JobListComponent } from './job-list/job-list.component';
import { AddJobComponent } from './add-job/add-job.component';
import { CandidatePrepComponent } from './candidate-prep/candidate-prep.component';
import { InterviewPrepComponent } from './interview-prep/interview-prep.component';
import { NotValidComponent } from './not-valid/not-valid.component';
import { PreviewJobComponent } from './preview-job/preview-job.component';

const routes: Routes = [
  { path: '', component: AllJobsComponent },
  { path: 'new-job', component: AddJobComponent },
  { path: 'job-detail', component: JobListComponent },
  { path: 'add-Candidate-prep', component: CandidatePrepComponent},
  { path: 'add-Interview-prep', component: InterviewPrepComponent},
  { path: 'invalid', component: NotValidComponent },
  { path: 'preview-job', component: PreviewJobComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobRoutingModule {}
