import { Component, OnInit } from '@angular/core';
import { CharityCategoryService } from '../Services/charity-category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DonationService } from '../Services/donation.service';

@Component({
  selector: 'app-charity-categories',
  templateUrl: './charity-categories.component.html',
  styleUrls: ['./charity-categories.component.css']
})
export class CharityCategoriesComponent implements OnInit{
  charityCategories: any[] = [];
 








  constructor(private charityCategoryService:CharityCategoryService,private router:Router,private toastr:ToastrService, private donationService:DonationService){}

  ngOnInit(): void { this.getCharityCategories();}
  getCharityCategories(): void {
    this.charityCategoryService.getAllCharityCategoriesWithCharities().subscribe(data => {

      this.charityCategories = this.groupByCategory(data);
    });
  }
  groupByCategory(data: any[]): any[] {
    const groupedData: any[] = [];
    data.forEach(item => {
      const existingCategory = groupedData.find(c => c.charityCategoryID === item.charityCategoryID);
      if (existingCategory) {
        existingCategory.charities.push({ charityID: item.charityID, charityName: item.charityName });
      } else {
        groupedData.push({
          charityCategoryID: item.charityCategoryID,
          categoryName: item.categoryName,
          charities: item.charityID ? [{ charityID: item.charityID, charityName: item.charityName }] : []
        });
      }
    });
    return groupedData;
  }


  
  viewCharityDetails(charityID: number): void {
    if (charityID !== 0) {
      this.router.navigate(['/charity-details', charityID]);
    }
  }
  


}
