import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(public http:HttpClient,private routr :Router,private spinner:NgxSpinnerService,private toastr:ToastrService,){}



// Logout function
 logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.routr.navigate(['/home']); // Navigate to home page after logout
}

//the login e
Login(email:any, password:any){
  var body= {
    email:email.value.toString(), 
    password:password.value.toString()
  }
  const headerDir={
    'Content-Type': 'application/json', 
    'Accept':'application/json'
  }
  const requestOptions={
    headers:new HttpHeaders(headerDir)
  }
  debugger;
  this.http.post('https://localhost:7127/api/Login/Login', body, requestOptions).subscribe((resp) => {
    console.log(resp);
    const token = resp.toString();
    localStorage.setItem('token', token);

    // Decode the JWT token 
    const data: any = jwtDecode(token);
    console.log('Decoded JWT data:', data);
    localStorage.setItem('user', JSON.stringify(data));

    // Store the user ID  userid this from the api
    const userId = data["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    localStorage.setItem('userId', userId);
    // to store the email
    const email = data["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    localStorage.setItem('userEmail', email);
    const userEmail = localStorage.getItem('userEmail');



    // Access the role using the full claim URI
    const role = data["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    // Navigate based on the role
    if (role === '1') {
      this.routr.navigate(['home']);
    } else if (role === '2') {
      this.routr.navigate(['admin/dashboard']);
    } else {
      this.toastr.error('Invalid role');
    }
  },err=>{
    this.toastr.error('username or password incorrect');
    console.log(err);
    
  })
 

}

//login end 
//register 
private apiUrl = 'https://localhost:7127/api/Register/register';
 register(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post(this.apiUrl, user, { headers });
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
 // دالة لجلب الجمعيات التابعة للمستخدم المسجل
 private apiUrll = 'https://localhost:7127/api/Charity';
 getCharitiesByUserId(userId: number): Observable<any> {
  debugger;
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  return this.http.get(`${this.apiUrll}/GetCharitiesByUserId/${userId}`, { headers });
}

// دالة للحصول على userId من localStorage
getUserId(): number {
  return parseInt(localStorage.getItem('userId') || '0', 10);
}


}