import { Component } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import {  ActivatedRoute, Router } from '@angular/router';
import { Main } from '../../model/main';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  main: Observable<Main[]>;



  constructor(
    public dialog: MatDialog,
    private mainService: MainService,
    private router: Router,
    private route: ActivatedRoute) {
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
  };

  ngOnInit(): void {}

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  onEdit(main: Main) {
    this.router.navigate(['edit', main._id], {relativeTo: this.route})
  }

}
