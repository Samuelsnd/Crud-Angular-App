import { MainService } from './../services/main.service';
import { Component } from '@angular/core';
import { Main } from './model/main';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  main: Observable<Main[]>;

  displayedColumns = ['name','categoria'];

  constructor(
    public dialog: MatDialog,
    private mainService: MainService) {
    this.main = this.mainService.findAll().pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.');
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }



  ngOnInit(): void {}

}
