import { Injectable } from '@angular/core';
import { CreateBusinessCardOutput } from '../models/create-business-card';
import { BehaviorSubject } from 'rxjs';
import { CreateBusinessCardShared } from '../models/business-card-Input';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardSharedDateService {

  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
  email?: string;
  phone?: string;
  address?: string;
  photo?:string;
  
  createBusinessCardOutput?: CreateBusinessCardOutput;
  CreateBusinessCardShared?: CreateBusinessCardShared;

  private businessCardSub=new BehaviorSubject<any> (null);
  constructor() { }
  setbusinessCardSub(input:any)
  {
  this.businessCardSub.next(input)
  }
  getbusinessCardSub()
  {
    return this.businessCardSub.asObservable();
  
  }
}
