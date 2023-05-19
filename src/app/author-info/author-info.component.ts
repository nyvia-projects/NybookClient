import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-author-info',
  templateUrl: './author-info.component.html',
  styleUrls: ['./author-info.component.css'],
})
export class AuthorInfoComponent implements OnInit {
  public author: any; // Update the type as per your Author interface

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const authorId = this.route.snapshot.params['id'];
    const url = environment.baseUrl + `api/Authors/${authorId}`;
    this.http.get<any>(url).subscribe(
      (result) => {
        this.author = result;
      },
      (error) => {
        console.log('Error occurred:', error);
      }
    );
  }
}
