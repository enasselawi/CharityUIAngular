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
  amount: number = 0;
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';

  constructor(
    private route: ActivatedRoute,
    private charityService: CharityCategoryService,
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getCharityDetails(id);
    }
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  getCharityDetails(charityID: number): void {
    this.charityService.getCharityById(charityID).subscribe(data => {
      this.charityDetails = data;
      console.log('Charity Details:', this.charityDetails);
    });
  }

  donate(): void {
    if (this.isLoggedIn) {
      const userId = parseInt(localStorage.getItem('userId') || '1', 10);
      const charityId = this.charityDetails.charityid;

      // التأكد من أن جميع البيانات مدخلة بشكل صحيح
      if (!this.amount || !this.cardNumber || !this.expiryDate || !this.cvv) {
        alert('Please fill in all the required fields.');
        return;
      }

      // إنشاء HttpParams لتمرير البيانات
      const params = new HttpParams()
        .set('userID', userId.toString())
        .set('charityID', charityId.toString())
        .set('amount', this.amount.toString())
        .set('cardNumber', this.cardNumber)
        .set('expiryDate', this.expiryDate)
        .set('cvv', this.cvv);

      // إرسال الطلب POST
      this.http.post('https://localhost:7127/api/Donation/ProcessDonation', null, {
        params,
        responseType: 'text'
      })
      .subscribe(
        response => {
          alert(response);
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
  }
}
