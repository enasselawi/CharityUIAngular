import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(public home : HomeService,private auth:AuthService){}
email : FormControl = new FormControl ('ex@exampe.com',[Validators.required,Validators.email] )
password :FormControl = new FormControl('********',[Validators.required])

submit(){
  this.auth.Login(this.email,this.password)
}











}

