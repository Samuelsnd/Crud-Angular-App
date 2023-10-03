import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    AppMaterialModule
  ]
})
export class MainModule { }
