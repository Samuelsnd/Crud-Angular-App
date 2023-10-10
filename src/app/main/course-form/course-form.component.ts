import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainService } from '../services/main.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private service: MainService,
              private snackBar: MatSnackBar,
              private location: Location) {

      this.form = this.formBuilder.group( {
        name: [null],
        categoria: [null]
      });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(result => this.onSucess(),
    error => this.onError());
  }

  onCancel() {
    this.location.back();
  }

  private onSucess() {
    this.snackBar.open('Cadastado Com Sucesso!' ,'',{duration: 5000});
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar Curso!', '',{duration: 5000});
  }
}
