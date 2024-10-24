import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetBusinessCard } from '../models/get-business-card';
import { CreateBusinessCardOutput } from '../models/create-business-card';
import { Form } from '@angular/forms';
import { FilterBusinessCard } from '../models/FilterBusinessCard';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardServiceService {

  private baseRoute = 'https://localhost:7127/api/business-card/';
  private getAllCardsUrl = this.baseRoute + 'GetAllBusinessCard';
  private CreateBusinssCardsUrl = this.baseRoute + 'CreateBusinessCard';
  private UploadBusinessCardFileUrl = this.baseRoute + 'UploadBusinessCardFile';
  private DeleteCardUrl = this.baseRoute + 'DeleteCard';
  private exportToCsvUrl = this.baseRoute + 'exportToCsv';
  private exportToXmlUrl = this.baseRoute + 'exportToXml'; // Add the export to XML URL
  private FilterBusinessCardUrl = this.baseRoute + 'GetFilterBusinessCard'; // Add the export to XML URL

  constructor(private http: HttpClient) {}

  getAllCards(): Observable<Array<GetBusinessCard>> {
    return this.http.post<Array<GetBusinessCard>>(this.getAllCardsUrl, null);
  }

  createBusinessCard(input: CreateBusinessCardOutput): Observable<Array<GetBusinessCard>> {
    return this.http.post<Array<GetBusinessCard>>(this.CreateBusinssCardsUrl, input);
  }
  GetFilterBusinessCard(input: FilterBusinessCard): Observable<Array<GetBusinessCard>> {
    return this.http.post<Array<GetBusinessCard>>(this.FilterBusinessCardUrl, input);
  }
  uploadBusinessCardFile(input: FormData): Observable<GetBusinessCard> {
    return this.http.post<GetBusinessCard>(this.UploadBusinessCardFileUrl, input);
  }

  deleteCard(input: CreateBusinessCardOutput): Observable<GetBusinessCard> {
    return this.http.post<GetBusinessCard>(this.DeleteCardUrl, input);
  }
  exportToCsv(input: CreateBusinessCardOutput): Observable<ArrayBuffer> {
    debugger
    return this.http.post<ArrayBuffer>(this.exportToCsvUrl, input, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'arraybuffer' as 'json'  // Correct response type for CSV download
    });
  }
  
  exportToXml(input: CreateBusinessCardOutput): Observable<ArrayBuffer> {
    debugger
    return this.http.post<ArrayBuffer>(this.exportToXmlUrl, input, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'arraybuffer' as 'json'  // Correct response type for CSV download
    });
  }

  
}
