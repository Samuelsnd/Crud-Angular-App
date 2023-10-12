import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Main } from '../model/main';
import { MainService } from './../services/main.service';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<Main> {

  constructor(private service: MainService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Main> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({ _id: '', name: '', categoria: '', lessons: [] });
  }
}
