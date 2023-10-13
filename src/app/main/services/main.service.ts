import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { Main } from '../model/main';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  private readonly API = 'api/courses';

  constructor(private httpCliente: HttpClient) { }

  findAll(){
    return this.httpCliente.get<Main[]>(this.API)
    .pipe(//delay(5000),
    tap(mainList => console.log(mainList)));
  }

  save(register: Partial<Main>) {
    if(register._id) {
      return this.update(register);
    }
      return this.create(register);
  }

  private create(record: Partial<Main>) {
    return this.httpCliente.post<Main>(this.API, record).pipe(first());
  }

  private update(record: Partial<Main>) {
    return this.httpCliente.put<Main>(`${this.API}/${record._id}`, record).pipe(first());
  }

  loadById(id: string) {
    return this.httpCliente.get<Main>(`${this.API}/${id}`);
  }

}
