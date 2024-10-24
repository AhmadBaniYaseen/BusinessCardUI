import { Component, inject, OnInit } from '@angular/core';
import { GetBusinessCard } from '../models/get-business-card';
import { BusinessCardServiceService } from '../Service/business-card-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateBusinessCardOutput } from '../models/create-business-card';
import { Router } from '@angular/router';
import { BusinessCardSharedDateService } from '../Service/business-card-shared-date.service';
import { CommonModule } from '@angular/common';  // Import CommonModule for NgIf
import { CreateBusinessCardShared } from '../models/business-card-Input';
import{ToastrModule , ToastNoAnimation ,ToastNoAnimationModule} from 'ngx-toastr';
import {ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-businss-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,ToastrModule],
  templateUrl: './create-businss-card.component.html',
  styleUrl: './create-businss-card.component.css'
})
export class CreateBusinssCardComponent implements OnInit {
  createForm!: FormGroup;
  createBusinessCardOutput!: CreateBusinessCardOutput;
  CreateBusinessCardShared!: CreateBusinessCardShared;
  isSecondSectionVisible = false;
  base64String: string = '';
  selectedFileName: string | undefined;
  filForm!: FormGroup;
  photoImg: string | undefined;
 


  constructor(
    private formBuilder: FormBuilder,
    private businessCardService: BusinessCardServiceService,
    private router: Router,
    private sharedDate: BusinessCardSharedDateService,
    private toastrService:ToastrService  
  ) {
  }

  ngOnInit(): void {
    this.createBusinessCardOutput = new CreateBusinessCardOutput();
    this.CreateBusinessCardShared = new CreateBusinessCardShared();
    this.initFormGroup();
  }


  private initFormGroup() {
    this.createForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(100)]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      address: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s,.-]+$')]],
      photo: ['',[Validators.required]]
    });
  }

  onAdditionalFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileName = input.files[0].name;
    }
  }
  saveCard() {
    debugger
    this.businessCardService.createBusinessCard(this.createBusinessCardOutput).subscribe(
      response => {
        this.toastrService.success("Create successfully");
        console.log('Form submitted successfully!', response);
      },
      error => {
        this.toastrService.error("Error");
        console.error('Error submitting the form', error);
      }
    );
  }

  onFileSelectedByCsvAndXml(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const fileInput = new FormData();
      fileInput.append('file', file);
      this.businessCardService.uploadBusinessCardFile(fileInput).subscribe(
        response => {
          console.log('Form submitted successfully!', response);
          debugger;
          if (response) {
            const fullName = response.name ? response.name.trim() : '';
            let firstName = '';
            let lastName = '';
  
            if (fullName) {
              const nameParts = fullName.split(' ');
              lastName = nameParts.pop() || ''; 
              firstName = nameParts.join(' '); 
            }
  
            this.createForm.patchValue({
              firstName: firstName, 
              lastName: lastName,   
              gender: response.gender?.toUpperCase() || '', 
              dateOfBirth: response.dateOfBirth || '',
              email: response.email || '',
              phone: response.phone || '',
              address: response.address || '',
              photo: response.photo || ''
            });
            debugger;

            if (response.photo != null) {
              this.base64String=response.photo;
            }
          }
        },
        error => {
          console.error('Error submitting the form', error);
        }
      );
    }
  
  
  
  }
  next() {
    console.log(this.createForm.errors);
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();  
      return;
    }
    this.createBusinessCardOutput = this.prepareCreateOutput();
    this.photoImg = this.base64String;
    this.isSecondSectionVisible = true;
  }
  Back() {
    this.isSecondSectionVisible = false;
  }

  prepareCreateOutput() {
    let createBusinessCardOutput = new CreateBusinessCardOutput();
    createBusinessCardOutput.name = `${this.createForm.get('firstName')?.value} ${this.createForm.get('lastName')?.value}`;
    createBusinessCardOutput.gender = this.createForm.get('gender')?.value;
    createBusinessCardOutput.dateOfBirth = this.createForm.get('dateOfBirth')?.value;
    createBusinessCardOutput.email = this.createForm.get('email')?.value;
    createBusinessCardOutput.phone = this.createForm.get('phone')?.value;
    createBusinessCardOutput.address = this.createForm.get('address')?.value;
    createBusinessCardOutput.photo = this.base64String;
    return createBusinessCardOutput;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        console.log(base64String); // This is the base64 encoded image string
        this.base64String = base64String;
        this.createForm.get('photo')?.setValue(base64String);
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  }
  
}
