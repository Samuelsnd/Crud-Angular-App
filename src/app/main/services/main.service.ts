import { Main } from './../main/model/main';
import { HttpClient } from '@angular/common/http'

import { Injectable } from '@angular/core';
import { delay, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  private readonly API = '/assets/courses.json';

  constructor(private httpCliente: HttpClient) { }

  findAll(){
    return this.httpCliente.get<Main[]>(this.API)
    .pipe(delay(5000),
    tap(mainList => console.log(mainList)));
  }

}
