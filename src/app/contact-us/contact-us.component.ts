import { Component } from '@angular/core';
import { ContactUsService } from '../Services/contact-us.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactMessage = {
    name: '',
    email: '',
    subject: '',
    messagecontent: '',
  };

  responseMessage: string = '';

  constructor(private contactUsService :ContactUsService){}
  onSubmit() {
    debugger;
    this.contactUsService.addContactMessage(this.contactMessage).subscribe(
      (response: any) => {
        this.responseMessage = response;
        this.contactMessage = {
          name: '',
          email: '',
          subject: '',
          messagecontent: '',
        };
      },
      (error) => {
        console.error('Error:', error);
        this.responseMessage = 'Failed to send message. Please try again.';
      }
    );
  }

}
