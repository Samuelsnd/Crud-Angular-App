import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { CourseFormComponent } from './course-form/course-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainComponent,
    CourseFormComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
