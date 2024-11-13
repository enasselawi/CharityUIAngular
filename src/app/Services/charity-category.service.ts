import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharityCategoryService {
  private apiUrl = 'https://localhost:7127/api/CharityCategory/GetAllCharityCategoriesWithCharities';

  private baseUrl = 'https://localhost:7127/api/Charity';
  constructor(private http:HttpClient) { }
  getAllCharityCategoriesWithCharities(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getCharityById(id: number): Observable<any> {
    return this.http.get(`https://localhost:7127/api/Charity/GetCharityById/${id}`);
  }
  
}
