import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface AboutUsContent {
  title: string;
  content: string;
}

interface HomeContent {
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class CharityContentService {
  private apiUrl = 'https://localhost:7127/api/Charity'; 
  constructor(private http:HttpClient) { }

  getAboutUsContent(): Observable<AboutUsContent> {
    return this.http.get<AboutUsContent>(`${this.apiUrl}/GetAboutUsContent`);
  }

  // Method to get Home content
  getHomeContent(): Observable<HomeContent> {
    return this.http.get<HomeContent>(`${this.apiUrl}/GetHomeContent`);
  }
}
