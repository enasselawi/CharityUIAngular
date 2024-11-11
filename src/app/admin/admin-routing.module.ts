import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagecategoryComponent } from './managecategory/managecategory.component';

const routes: Routes = [

  {
    path:'dashboard', 
    component:DashboardComponent
  },
{
  path:'managecategory',
  component:ManagecategoryComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
