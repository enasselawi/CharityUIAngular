import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ProfileComponent } from './profile/profile.component';
import { AddTestimonialComponent } from './add-testimonial/add-testimonial.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CharityCategoriesComponent } from './charity-categories/charity-categories.component';
import { CharityDetailsComponent } from './charity-details/charity-details.component';
import { UserCharitiesComponent } from './user-charities/user-charities.component';
import { GetcharitiesComponent } from './getcharities/getcharities.component';
import { AddcharityComponent } from './addcharity/addcharity.component';
import { ManagecategoryComponent } from './admin/managecategory/managecategory.component';
import { AboutUsCComponent } from './about-us-c/about-us-c.component';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'',
    component:HomeComponent
    },
    {
      path:'security', 
      loadChildren:()=>AuthModule
    },{
      path:'admin', 
      loadChildren:()=>AdminModule,
    
    },
    { path: 'profile', component: ProfileComponent },
    {
      path: 'testimonial',component:AddTestimonialComponent
    },
    {
      path:'contact',component:ContactUsComponent
    },
    {
      path:'charitycategory',component:CharityCategoriesComponent
    }
    ,{
      path: 'charitydetails/:id',component:CharityDetailsComponent
    }
    ,
    {path: 'user-charities',component:UserCharitiesComponent},
    {path:'getcharity',component:GetcharitiesComponent},
    {path:'addcharity',component:AddcharityComponent},
    {path:'manage',component:ManagecategoryComponent},
    { path: 'about-us', component: AboutUsCComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
