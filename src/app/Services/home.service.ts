import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = 'https://localhost:7127/api/CharityCategory';
  constructor(public http:HttpClient,private routr :Router,private spinner:NgxSpinnerService,private toastr:ToastrService) { }
 
  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAllCharityCategories`).pipe(
      catchError(err => {
        this.toastr.error('Failed to load categories');
        return throwError(err);
      })
    );
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetCharityCategoryById/${id}`).pipe(
      catchError(err => {
        this.toastr.error('Failed to load category details');
        return throwError(err);
      })
    );
  }

  createCategory(categoryData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/CreateCharityCategory`, categoryData).pipe(
      catchError(err => {
        this.toastr.error('Failed to create category');
        return throwError(err);
      })
    );
  }

  updateCategory(categoryData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/UpdateCharityCategory`, categoryData).pipe(
      catchError(err => {
        this.toastr.error('Failed to update category');
        return throwError(err);
      })
    );
  }

  deleteCategory(id: number): Observable<any> {
    debugger;
    return this.http.delete(`https://localhost:7127/api/CharityCategory/DeleteCharityCategory/${id}`);
  }
  
  
}
