import { Component, OnInit } from '@angular/core';
import { HomeService } from '../Services/home.service';
import { AuthService } from '../Services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(public home:HomeService,public auth:AuthService,private spinner:NgxSpinnerService){}
  ngOnInit(): void {
   /** spinner starts on init */
   this.spinner.show();

   setTimeout(() => {
     /** spinner ends after 5 seconds */
     this.spinner.hide();
   }, 5000);




  }

}
