import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CourseFormComponent } from './course-form/course-form.component';

const routes: Routes = [
  { path:'', component: MainComponent},
  { path:'new', component: CourseFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
