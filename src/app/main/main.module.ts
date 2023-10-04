import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    AppMaterialModule,
    SharedModule
  ]
})
export class MainModule { }
