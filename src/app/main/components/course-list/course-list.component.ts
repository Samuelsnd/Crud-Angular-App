
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Main } from '../../model/main';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {

  @Input() main: Main[] = [];// Entrada
  @Output() add = new EventEmitter(false);

  readonly displayedColumns = ['name', 'categoria', 'actions'];

  onAdd() {
    this.add.emit(true);
  }
}
