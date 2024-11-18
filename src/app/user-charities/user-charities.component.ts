import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-charities',
  templateUrl: './user-charities.component.html',
  styleUrls: ['./user-charities.component.css']
})
export class UserCharitiesComponent implements OnInit{

  charities: any[] = [];
  donationAmount: number = 0;
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  constructor(private authService:AuthService,private toastr:ToastrService){}
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
      },
      (error) => {
        this.toastr.error('Payment failed. Please check your card details and try again.');
        console.error('Payment error:', error);
      }
    );
  }

























}
