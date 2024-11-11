import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7127/api/User';
 
  constructor(private http:HttpClient) { }

 // عرض بيانات الملف الشخصي للمستخدم
 getUserProfile(userId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/ViewUserProfile/${userId}`);
}
 // تحديث بيانات الملف الشخصي للمستخدم
 updateUserProfile(userId: number, profileData: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  profileData.userid = userId;
  return this.http.put(`${this.apiUrl}/UpdateUserProfile`, profileData, { headers });
}
 
}










;
