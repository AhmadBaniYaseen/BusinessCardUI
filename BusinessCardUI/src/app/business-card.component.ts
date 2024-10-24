import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GetBusinessCard } from './models/get-business-card';
import { BusinessCardServiceService } from './Service/business-card-service.service';
import { HttpClient } from '@angular/common/http';
import { CreateBusinessCardOutput } from './models/create-business-card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterBusinessCard } from './models/FilterBusinessCard';
import { throwError } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-business-card',
  standalone: true,
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css'], // Corrected from styleUrl to styleUrls
  imports: [CommonModule,ReactiveFormsModule,RouterModule] // Import CommonModule to use NgFor
})

export class BusinessCardComponent implements OnInit {

  cards: Array<GetBusinessCard> | undefined;
  FilterBusinessCardForm!: FormGroup;
  createBusinessCardOutput!: FilterBusinessCard;

  constructor(
    private formBuilder: FormBuilder,
    
    private businessCardService: BusinessCardServiceService,  private toastrService:ToastrService  ) {
  }

  ngOnInit(): void {
    this.cards = new Array<GetBusinessCard>();
    this.createBusinessCardOutput = new FilterBusinessCard();
    this.initFormGroup();

    this.getAllCards();
  }

  private initFormGroup() {
    this.FilterBusinessCardForm = this.formBuilder.group({
      name: [null,  [Validators.maxLength(100)]],
      gender: [null, ],
      dateOfBirth: [null, ],
      email: [null, [ Validators.email]],
      phone: [null, [ Validators.pattern(/^\d{10}$/)]],
      
    });
  }
  Search(){
    debugger
    this.createBusinessCardOutput = this.prepareCreateOutput();
   this. FilterCard();
  }

  prepareCreateOutput() {
    debugger
    let createBusinessCardOutput = new FilterBusinessCard();
    createBusinessCardOutput.name = this.FilterBusinessCardForm.get('name')?.value;
    createBusinessCardOutput.gender = this.FilterBusinessCardForm.get('gender')?.value;
    createBusinessCardOutput.dateOfBirth = this.FilterBusinessCardForm.get('dateOfBirth')?.value;
    createBusinessCardOutput.email = this.FilterBusinessCardForm.get('email')?.value;
    createBusinessCardOutput.phone = this.FilterBusinessCardForm.get('phone')?.value;
    return createBusinessCardOutput;
  }

  FilterCard() {
    debugger
    console.log(this.createBusinessCardOutput)
    this.businessCardService.GetFilterBusinessCard(this.createBusinessCardOutput).subscribe({
      next: (cards) => {
        this.cards = cards;
        
      },
      error: (err) => {
        console.error('Error fetching cards:', err);
        // Handle error case
      },
      complete: () => {
        console.log('Fetching cards completed');
      }
    });
  }

  getAllCards(){
    this.businessCardService.getAllCards().subscribe({
      next: (cards) => {
        this.cards = cards;
      },
      error: (err) => {
        console.error('Error fetching cards:', err);
        // Handle error case
      },
      complete: () => {
        console.log('Fetching cards completed');
      }
    });
  }

  onDelete(cards:CreateBusinessCardOutput){
    debugger
    this.businessCardService.deleteCard(cards).subscribe(
      response => {
       this. getAllCards();
        console.log('Form Delete successfully!', response);
        this.toastrService.success("Business card deleted");
      },
      error => {
        console.error('Error Delete the Card', error);
        this.toastrService.error("Error delete the card");
      }
    );
  }

  onExportToCsv(card: CreateBusinessCardOutput) {
    debugger
    this.businessCardService.exportToCsv(card).subscribe(
      (response: ArrayBuffer) => {
        const blob = new Blob([response], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${card.name}.csv`; // Use the card name for the downloaded file
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        this.toastrService.success("Business card Exported successfully");
      },
      error => {
        console.error('Error exporting CSV:', error);
        this.toastrService.error("Error exporting CSV");
      }
    );
  }

  onExportToXml(card: CreateBusinessCardOutput) {
    debugger;
    this.businessCardService.exportToXml(card).subscribe(
      (response: ArrayBuffer) => {
        const blob = new Blob([response], { type: 'application/xml' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${card.name}.xml`; // Use the card name for the downloaded file
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        console.log('XML exported successfully!');
        this.toastrService.success("Business card Exported successfully");

      },
      error => {
        console.error('Error exporting XML:', error);
        this.toastrService.error("Error exporting XML");
      }
    );
  }
  reset() {
   this.FilterBusinessCardForm.reset();
   this.createBusinessCardOutput = this.prepareCreateOutput();
   this. FilterCard();
    }





}
 