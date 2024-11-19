import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';  // Import EmailJS
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-charities',
  templateUrl: './user-charities.component.html',
  styleUrls: ['./user-charities.component.css'],
  providers: [DatePipe]
})
export class UserCharitiesComponent implements OnInit{

  charities: any[] = [];
  donationAmount: number = 0;
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  constructor(private authService:AuthService,private toastr:ToastrService,   private datePipe:DatePipe){}
  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.authService.getCharitiesByUserId(userId).subscribe(
        (data) => {
          this.charities = data;
          console.log('User charities:', this.charities);
        },
        (error) => {
          console.error('Error fetching charities:', error);
        }
      );
    }
  }

  payForPost(charityId: number): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.toastr.error('User not logged in.');
      return;
    }

    const paymentDetails = {
      userId: userId,
      charityId: charityId,
      amount: this.donationAmount,
      cardNumber: this.cardNumber,
      expiryDate: this.expiryDate,
      cvv: this.cvv
    };


    this.authService.payForPost(paymentDetails).subscribe(
      (response) => {
        this.toastr.success(response, 'Payment Successful');
        console.log('Payment response:', response);
        this.sendEmail();
      },
      (error) => {
        this.toastr.error('Payment failed. Please check your card details and try again.');
        console.error('Payment error:', error);
      }
    );
  }
  sendEmail(): void {
    const userEmail = localStorage.getItem('userEmail') || '';
    const donationDate = this.datePipe.transform(new Date(), 'dd-MMM-yyyy');
    
    const templateParams = {
      to_email: userEmail,
      donation_amount: this.donationAmount,
      donation_date: donationDate,
    };

    emailjs.send('service_vzc2s4m', 'template_pta2bpp', templateParams, 'LI5Y3kVOg0r3KQQ4K')
      .then((response) => {
        console.log('Email sent successfully:', response);
        this.toastr.success('Donation receipt has been sent to your email.');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        this.toastr.error('Failed to send email. Please try again.');
      });
  }
























}