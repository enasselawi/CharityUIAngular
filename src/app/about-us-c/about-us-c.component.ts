import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharityContentService } from '../Services/charity-content.service';

@Component({
  selector: 'app-about-us-c',
  templateUrl: './about-us-c.component.html',
  styleUrls: ['./about-us-c.component.css']
})
export class AboutUsCComponent implements OnInit {
  title: string = '';
  content: string = '';
  constructor(private charityService:CharityContentService){}
  ngOnInit(): void {
    this.charityService.getAboutUsContent().subscribe(data => {
      this.title = data.title;
      this.content = data.content;
    });
  }

}
