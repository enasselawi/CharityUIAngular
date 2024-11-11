import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private apiUrl = 'https://localhost:7127/api/Testimonial';

  constructor(private http:HttpClient) { }
   // the user  add the teationail from the userrr
   createTestimonial(userId: number, content: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const body = {
      userid: userId,  // userid like in the pi side
      content: content
    };

    return this.http.post(`${this.apiUrl}/CreateTestimonial`, body, { headers });
  }


}
