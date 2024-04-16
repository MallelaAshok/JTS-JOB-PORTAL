import { Component, OnInit } from '@angular/core';
// import { DataService, Person } from './ng-select.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterLink } from '@angular/router';
import Stepper from 'bs-stepper';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-new-job',
  templateUrl: './post-new-job.component.html',
  styleUrls: ['./post-new-job.component.scss'],
})
export class PostNewJobComponent implements OnInit {
  constructor(private fb: UntypedFormBuilder) {}
  public Editor: any = ClassicEditor;
 private router : any = Router

  postNewJobs!: UntypedFormGroup;
  name = 'Angular';
  private stepper!: Stepper;
  displayNewAddress = false;
  displaySameRegAddress = false;
  displayMale = false;
  displayFemale = false;
  displayMalefemale = false;
  displayFresher = false;
  displayExperience= false;
  displayAny = false;
  displayOfficeLocation = false;
  displayFieldJob = false;
  displayHomeLocation = false;
  displayIncentive = false;
  displayFixedIncentive = false;
  displayFixed = false;
  salaryPreview = false;
  specificCity = false;
  anywhere = false;
  commOthers = false;
  notifyOthers = false;
  displayAddress = false;
  displayAnywhere = false;
  displaySpecific = false;
  displayWalkin = false;
  displayTelephonic = false;
  displayShortlist = false;

  next(event: Event) {
    event.preventDefault();
    if (this.stepper) {
      this.stepper.next();
    }
  }

  onSubmit() {
    console.log('Form Value', this.postNewJobs.value);
  }
  onSalaryChange() {
    this.salaryPreview = true;
    const salaryTypeControl = this.postNewJobs.get('salaryType');
    console.log('Salary type changed');
    if (salaryTypeControl) {
      const selectedValue = salaryTypeControl.value;
      console.log('radio value', selectedValue);
      if (selectedValue === 'incentive_only') {
        this.displayIncentive = true;
        this.displayFixedIncentive = false;
        this.displayFixed = false;
      }
      if (selectedValue === 'fixed_only') {
        this.displayIncentive = false;
        this.displayFixedIncentive = false;
        this.displayFixed = true;
      }
      if (selectedValue === 'fixed_incentive') {
        this.displayIncentive = false;
        this.displayFixedIncentive = true;
        this.displayFixed = false;
      }
    }
  }

  OnWorkLocationChange() {
    const workLocationAddress = this.postNewJobs.get('work_location_address');

    if (workLocationAddress) {
      const selectedValue = workLocationAddress.value;
      console.log('radio value', selectedValue);
      if (selectedValue === 'new_address') {
        this.displayNewAddress = true;
       } else{
        this.displayNewAddress = false;
       }
    }
  }



  OnGenderChange() {
    const GenderType = this.postNewJobs.get('gender');

    if (GenderType) {
      const selectedValue = GenderType.value;
      console.log('radio value', selectedValue);
      if (selectedValue === 'Male') {
        this.displayMale = true;
        this.displayFemale = false;
        this.displayMalefemale = false;
       
      }
      if (selectedValue === 'Female') {
        this.displayMale = false;
        this.displayFemale = true;
        this.displayMalefemale = false;
      }

      if (selectedValue === 'Both Male and Female') {
        this.displayMale = false;
        this.displayFemale = false;
        this.displayMalefemale = true;
      }
  
    }
  }

  onRadioChange() {
    const workLocationControl = this.postNewJobs.get('work_location');

    if (workLocationControl) {
      const selectedValue = workLocationControl.value;
      console.log('radio value', selectedValue);
      if (selectedValue === 'Work From Home') {
        this.displayHomeLocation = true;
        this.displayOfficeLocation = false;
        this.displayFieldJob = false;
      }
      if (selectedValue === 'Field Job') {
        this.specificCity = false;
        this.displayFieldJob = true;
        this.displayOfficeLocation = false;
        this.displayHomeLocation = false;
      }
      if (selectedValue === 'Work From Office') {
        this.specificCity = false;
        this.displayOfficeLocation = true;
        this.displayFieldJob = false;
        this.displayHomeLocation = false;
      }
    }
  }

  OnExperienceChange() {
    const expControl = this.postNewJobs.get('experiencerequired');

    if (expControl) {
      const selectedValue = expControl.value;
      console.log('radio value', selectedValue);
      if (selectedValue === 'Fresher') {
        this.displayFresher = true;
        this.displayExperience = false;
        this.displayAny = false;
      }
      if (selectedValue === 'Experience') {
        this.displayExperience = true;
        this.displayAny = false;
        this.displayFresher = false;
      }
      if (selectedValue === 'Any') {
        this.displayAny = true;
        this.displayExperience = false;
        this.displayFresher = false;
      }
    }
  }

  OnReceiveAppFrom() {
    const OnReceiveAppFromControl = this.postNewJobs.get('receiveappfrom');

    if (OnReceiveAppFromControl) {
      const selectedValue = OnReceiveAppFromControl.value;
      console.log('radio value', selectedValue);
      if (selectedValue === 'Specific_Loc') {
        this.displayAnywhere = true;
        this.displaySpecific = false;
   
      }
      if (selectedValue === 'Anywhere_Ind') {
        this.displayAnywhere = false;
        this.displaySpecific = true;
      }
   
    }
  }

  
  OnTypeOfInterview() {
    const workLocationControl = this.postNewJobs.get('typeofinterview');

    if (workLocationControl) {
      const selectedValue = workLocationControl.value;
      console.log('radio value', selectedValue);
      if (selectedValue === 'walk_in') {
        this.displayWalkin = true;
        this.displayTelephonic = false;
        this.displayShortlist = false;
      }
      if (selectedValue === 'telephonic_int') {
        this.displayWalkin = false;
        this.displayTelephonic = true;
        this.displayShortlist = false;
      }
      if (selectedValue === 'short_list') {
        this.displayWalkin = false;
        this.displayTelephonic = false;
        this.displayShortlist = true;
      }
    }
  }
  
  commPrefChange() {
    const commPrefChangeControl = this.postNewJobs.get('comm_pref');

    if (commPrefChangeControl) {
      const selectedValue = commPrefChangeControl.value;
      console.log('comm_pref value', selectedValue);
      if (selectedValue === 'Comm_others') {
        this.commOthers = true;
      } else {
        this.commOthers = false;
      }
    }
  }

  notifyPrefChange() {
    const commPrefChangeControl = this.postNewJobs.get('notify_pref');

    if (commPrefChangeControl) {
      const selectedValue = commPrefChangeControl.value;
      console.log('notify_pref value', selectedValue);
      if (selectedValue === 'notify_others') {
        this.notifyOthers = true;
      } else {
        this.notifyOthers = false;
      }
    }
  }

  WFHChange() {
    const workFromHomeControl = this.postNewJobs.get('wfh_change');

    if (workFromHomeControl) {
      const selectedValue = workFromHomeControl.value;
      if (selectedValue === 'Specific city') {
        this.specificCity = true;
        this.anywhere = false;
      } else {
        this.specificCity = false;
        this.anywhere = true;
      }
    }
  }

  initForm() {
    this.postNewJobs = this.fb.group({
      company_name: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z]+')],
      ],
      last: [''],
      department: ['', Validators.required],
      work_location_address: [''],
      comm_pref: [''],
      salaryType: [''],
      nightShift: [''],
      min_salary: [''],
      specificCity: [''],
      wfh_change: [''],
      notify_pref: [''],
      plot_number: [''],
      max_salary: [''],
      incentive: [''],
      over_time: [''],
      joining_fee: [''],
      experiencerequired:  [''],
      comment: [''],
      receiveappfrom: [''],
      typeofinterview: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      address: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      termcondition: [false, [Validators.requiredTrue]],
    });
  }

  ngOnInit() {
    this.initForm();
    console.log('form value', this.postNewJobs.value);
    const stepperElement = document.querySelector('#stepper1');

    if (stepperElement) {
      this.stepper = new Stepper(stepperElement, {
        linear: false,
        animation: true,
      });
    }
  }

  saveJob() {
    Swal.fire({
      title: 'Job Created Successfully',
      // text: "You won't be able to revert this!",
      icon: 'success',
      // showCancelButton: false,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      // confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.value) {
        // Swal.fire(
        //   'Account created!',
        //   'Your account has been created.',
        //   'success'
        // );
        this.router.navigate(['/dashboard/main']);
      }
    });
  }
}
