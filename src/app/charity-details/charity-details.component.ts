import { Component, OnInit } from '@angular/core';
import { CharityCategoryService } from '../Services/charity-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-charity-details',
  templateUrl: './charity-details.component.html',
  styleUrls: ['./charity-details.component.css'],
  providers: [DatePipe]
})
export class CharityDetailsComponent implements OnInit {
  charityDetails: any = {};
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private charityService: CharityCategoryService,
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getCharityDetails(id);
    }
    this.isLoggedIn = this.authService.isLoggedIn();  // Check login status
    
  }

  getCharityDetails(charityID: number): void {
   
    this.charityService.getCharityById(charityID).subscribe(data => {
      this.charityDetails = data;
      console.log('Charity Details:', this.charityDetails);  // Check the data structure

     
    });
  }
 

  donate(): void {
    debugger;
    if (this.isLoggedIn) {
      // Retrieve userId and convert it to an integer
      const userId = parseInt(localStorage.getItem('userId') || '1', 10); // Default to 1 if not found
      const charityId = this.charityDetails.charityid; // Ensure this is set correctly
      const amount = 2; // Adjust the amount as needed
      const cardNumber = '123';
      const expiryDate = '01-DEC-2025'; // Ensure the date format matches what the API expects
      const cvv = '123';
  
      // Log the parameter values to the console
      console.log('Parameters to send:');
      console.log('userId:', userId);
      console.log('charityId:', charityId);
      console.log('amount:', amount);
      console.log('cardNumber:', cardNumber);
      console.log('expiryDate:', expiryDate);
      console.log('cvv:', cvv);
  
      // Create HttpParams for query parameters
      const params = new HttpParams()
        .set('userID', userId.toString()) // Convert userId back to string for HttpParams
        .set('charityID', charityId.toString())
        .set('amount', amount.toString())
        .set('cardNumber', cardNumber)
        .set('expiryDate', expiryDate)
        .set('cvv', cvv);
  
      // Send POST request with query parameters in the URL
      this.http.post('https://localhost:7127/api/Donation/ProcessDonation', null, {
        params,
        responseType: 'text' // Specify that you expect a plain text response
      })
      .subscribe(
        response => {
          alert(response); // The response will be the plain text message
        },
        (error: HttpErrorResponse) => {
          console.error('Donation failed:', error);
          alert('Donation failed, please try again.');
        }
      );
    } else {
      alert('You must be logged in to make a donation.');
      this.router.navigate(['/login']);
    }
  }}