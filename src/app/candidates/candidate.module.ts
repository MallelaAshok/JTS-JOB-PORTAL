import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CandidateRoutingModule } from './candidate-routing.module';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [CandidateDetailComponent,CandidateListComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgScrollbarModule,
    CandidateRoutingModule,
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot()
    
  ],
  providers:[ ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CandidateModule {}
