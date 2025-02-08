import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IceAndFireService {

  private baseUrl = 'https://anapioficeandfire.com/api/books';

  constructor(private httpClient: HttpClient) { }

  public getBooks(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }

  public getBookById(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }
}
