import { Component } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Main } from '../../model/main';
import { Lesson } from '../../model/lesson';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';

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
              private route: ActivatedRoute,
              public formUtils: FormUtilsService) {}

  ngOnInit(): void{
    const main: Main = this.route.snapshot.data['main'];
    this.form = this.formBuilder.group( {
      _id: [main._id],
      name: [main.name, [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)]],
      categoria: [main.categoria, [Validators.required]],
      lessons: this.formBuilder.array(this.retrieveLessons(main), Validators.required)
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
      name: [lesson.name, [Validators.required, Validators.minLength(10),Validators.maxLength(100)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required, Validators.minLength(5),Validators.maxLength(100)]]});
  }


  onSubmit() {
    if(this.form.valid){
      this.service.save(this.form.value).subscribe(result => this.onSucess(),
      error => this.onError());
    } else {
      this.formUtils.validateAllformfields(this.form);
    }
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
