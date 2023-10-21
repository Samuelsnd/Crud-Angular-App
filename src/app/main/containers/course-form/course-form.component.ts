import { Component } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Main } from '../../model/main';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private service: MainService,
              private snackBar: MatSnackBar,
              private location: Location,
              private route: ActivatedRoute) {}

  ngOnInit(): void{
    const main: Main = this.route.snapshot.data['main'];
    this.form = this.formBuilder.group( {
      _id: [main._id],
      name: [main.name, [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)]],
      categoria: [main.categoria, [Validators.required]],
      lessons: this.formBuilder.array(this.retrieveLessons(main))
    });
    console.log(this.form);
    console.log(this.form.value);
  }

  private retrieveLessons(main: Main) {
    const lessons = [];
    if (main?.lessons) {
      main.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)))
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  addNewLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  removeLesson(index: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  private createLesson(lesson: Lesson = {id: '', name: '', youtubeUrl: ''}) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name],
      youtubeUrl: [lesson.youtubeUrl]
    })
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

  getErrorMessage(fieldName: string) {
      const field = this.form.get(fieldName);

      if (field?.hasError('required')) {
        return 'Campo obrigatório!'
      }
      if (field?.hasError('minlength')) {
        const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
        return `Tamanho mínimo é de ${requiredLength} caracteres.`
      }
      if (field?.hasError('maxlength')) {
        const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
        return `Tamanho máximo é de ${requiredLength} caracteres.`
      }
        return 'Campo inválido!'
  }
}
