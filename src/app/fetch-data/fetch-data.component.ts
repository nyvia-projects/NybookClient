import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css'],
})
export class FetchDataComponent {
  public authors: Author[] = [];

  constructor(http: HttpClient) {
    http.get<Author[]>(environment.baseUrl + '/api/Author').subscribe(
      (result) => {
        this.authors = result;
      },
      (error) => console.error(error)
    );
  }
}

interface Author {
  name: string;
  age: number;
  rating: number;
}
