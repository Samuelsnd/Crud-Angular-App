import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseFormComponent } from './containers/course-form/course-form.component';
import { MainComponent } from './containers/main/main.component';

const routes: Routes = [
  { path:'', component: MainComponent},
  { path:'new', component: CourseFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
