import { Component, OnInit } from '@angular/core';
import { HomeService } from '../Services/home.service';
import { AuthService } from '../Services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CharityContentService } from '../Services/charity-content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  title: string = '';
  content: string = '';
  constructor(public home:HomeService,public auth:AuthService,private spinner:NgxSpinnerService,private charityService:CharityContentService){}
  ngOnInit(): void {
   /** spinner starts on init */
   this.spinner.show();

   setTimeout(() => {
     /** spinner ends after 3 seconds */
     this.spinner.hide();
   }, 3000);
   this.charityService.getHomeContent().subscribe(data => {
    this.title = data.title;
    this.content = data.content;
  });



  }

}
