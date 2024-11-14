import { Component, OnInit } from '@angular/core';
import { CharityCategoryService } from '../Services/charity-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AuthService } from '../Services/auth.service';
import jsPDF from 'jspdf'; // استيراد مكتبة jsPDF
import 'jspdf-autotable'; // خيار إضافي لاستخدام الجدول في PDF إذا لزم الأمر

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
  showDownloadButton: boolean = false;

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

      if (!this.amount || !this.cardNumber || !this.expiryDate || !this.cvv) {
        alert('Please fill in all the required fields.');
        return;
      }

      const params = new HttpParams()
        .set('userID', userId.toString())
        .set('charityID', charityId.toString())
        .set('amount', this.amount.toString())
        .set('cardNumber', this.cardNumber)
        .set('expiryDate', this.expiryDate)
        .set('cvv', this.cvv);

      this.http.post('https://localhost:7127/api/Donation/ProcessDonation', null, {
        params,
        responseType: 'text'
      })
      .subscribe(
        response => {
          alert(response);
          this.showDownloadButton = true;
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

  // Generate PDF after successful donation
  generatePDF(): void {
    const doc = new jsPDF();
    const donationDate = this.datePipe.transform(new Date(), 'dd-MMM-yyyy');
    doc.setFontSize(16);
    doc.text('Donation Invoice', 20, 20);
    
    // Adding donation details
    doc.setFontSize(12);
    doc.text(`Charity: ${this.charityDetails.charityname}`, 20, 40);
    doc.text(`Donation Amount: $${this.amount}`, 20, 50);
    doc.text(`Donation Date: ${donationDate}`, 20, 60);
    doc.text('Thank you for your support!', 20, 80);

    // Save the PDF
    doc.save('Donation_Invoice.pdf');
  }
}
