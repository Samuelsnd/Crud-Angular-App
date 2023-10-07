import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainService } from '../services/main.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private service: MainService,
              private snackBar: MatSnackBar) {

      this.form = this.formBuilder.group( {
        name: [null],
        categoria: [null]
      });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(result => console.log(result),
    error => this.onError());
  }

  onCancel() {

  }

  onError() {
    this.snackBar.open('Erro ao salvar Curso!', '',{duration: 5000});
  }
}
