
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'candidates',
    pathMatch: 'full',
  },
  {
    path: 'candidate-list',
    component: CandidateListComponent,
  },
  {
    path: 'candidate-detail',
    component: CandidateDetailComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateRoutingModule {}
