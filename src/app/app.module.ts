import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { AddTestimonialComponent } from './add-testimonial/add-testimonial.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CharityCategoriesComponent } from './charity-categories/charity-categories.component';
import { CharityDetailsComponent } from './charity-details/charity-details.component';
import { UserCharitiesComponent } from './user-charities/user-charities.component';
import { GetcharitiesComponent } from './getcharities/getcharities.component';
import { AddcharityComponent } from './addcharity/addcharity.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    AddTestimonialComponent,
    ContactUsComponent,
    CharityCategoriesComponent,
    CharityDetailsComponent,
    UserCharitiesComponent,
    GetcharitiesComponent,
    AddcharityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    FormsModule







  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
