import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharityCategoryService {
  private apiUrl = 'https://localhost:7127/api/CharityCategory/GetAllCharityCategoriesWithCharities';


  constructor(private http:HttpClient) { }
  getAllCharityCategoriesWithCharities(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
