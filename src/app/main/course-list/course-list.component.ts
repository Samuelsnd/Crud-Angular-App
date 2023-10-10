import { Component, Input } from '@angular/core';
import { Main } from '../main/model/main';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {

  @Input() main: Main[] = [];

  readonly displayedColumns = ['name','categoria','actions'];

  constructor(private router: Router,
    private route: ActivatedRoute) {}

    onAdd() {
      this.router.navigate(['new'], {relativeTo: this.route})
    }
}
