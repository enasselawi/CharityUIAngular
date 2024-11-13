import { Component, OnInit } from '@angular/core';
import { CharityCategoryService } from '../Services/charity-category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-charity-details',
  templateUrl: './charity-details.component.html',
  styleUrls: ['./charity-details.component.css']
})
export class CharityDetailsComponent  implements OnInit{
  charityDetails: any = {};
  constructor(private route:ActivatedRoute,private charityService:CharityCategoryService){}
  ngOnInit(): void { 
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getCharityDetails(id);
    }
  }
  getCharityDetails(charityID: number): void {
    this.charityService.getCharityById(charityID).subscribe(data => {
      this.charityDetails = data;
      console.log(this.charityDetails); // تحقق من البيانات في Console
    });
  }

}
