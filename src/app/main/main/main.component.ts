import { MainService } from './../services/main.service';
import { Component } from '@angular/core';
import { Main } from './model/main';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  main: Observable<Main[]>;

  displayedColumns = ['name','categoria'];

  constructor(private mainService: MainService) {
    this.main = this.mainService.findAll();
  }

  ngOnInit(): void {

  }

}
