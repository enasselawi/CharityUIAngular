import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ProfileComponent } from './profile/profile.component';
import { AddTestimonialComponent } from './add-testimonial/add-testimonial.component';

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
    }
  
    
    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
