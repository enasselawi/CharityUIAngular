import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TestimonialService } from '../Services/testimonial.service';

@Component({
  selector: 'app-add-testimonial',
  templateUrl: './add-testimonial.component.html',
  styleUrls: ['./add-testimonial.component.css']
})
export class AddTestimonialComponent implements OnInit{
  testimonialForm: FormGroup;
  userId: number;
  constructor(private fb:FormBuilder,
    private testimonialService:TestimonialService,
    private toastr:ToastrService

  ){

        // userId من localStorage
        this.userId = +localStorage.getItem('userId')!;
        this.testimonialForm = this.fb.group({
          content: ['', Validators.required]  
        });
  }
  ngOnInit(): void {}

  onSubmitTestimonial(): void {
    if (this.testimonialForm.valid) {
      const content = this.testimonialForm.get('content')?.value;

      this.testimonialService.createTestimonial(this.userId, content).subscribe(() => {
          this.toastr.success('Testimonial added successfully');
          this.testimonialForm.reset();
        },
        (error) => {
          this.toastr.error('Error adding testimonial');
          console.error(error);
        }
      );
    } else {
      this.toastr.error('Please enter the testimonial content');
    }
  }
}
