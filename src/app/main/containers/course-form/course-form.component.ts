import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Main } from '../../model/main';

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
              private location: Location,
              private route: ActivatedRoute) {
      this.form = this.formBuilder.group( {
        name: [null],
        categoria: [null]
      });
  }

  ngOnInit(): void{
    const main: Main = this.route.snapshot.data['main'];
    this.form.setValue({ name: main.name, categoria: main.categoria})
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
