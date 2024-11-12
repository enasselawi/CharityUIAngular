import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  
  private apiUrl = 'https://localhost:7127/api/ContactMessage/AddContactMessage';
  constructor(private http:HttpClient) { }
  addContactMessage(contactMessage: any): Observable<any> {
    return this.http.post(this.apiUrl, contactMessage, {
      responseType: 'text', // To get the plain text response
    });
  }
}
