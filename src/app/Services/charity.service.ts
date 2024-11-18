import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharityService {
  private apiUrl = 'https://localhost:7127/api/Charity';
  getCharityCategories(): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7127/api/CharityCategory/GetAllCharityCategories
`);
  }

  constructor(private http: HttpClient) {}

  addCharity(charityData: any): Observable<any> {
    console.log(charityData)
    return this.http.post('https://localhost:7127/api/Charity/CreateCharity', charityData);
  }
}
