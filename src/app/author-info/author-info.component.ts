import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Book } from '../books/book';

@Component({
  selector: 'app-author-info',
  templateUrl: './author-info.component.html',
  styleUrls: ['./author-info.component.css'],
})
export class AuthorInfoComponent implements OnInit {
  public author: any;
  public books: Book[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const authorId = this.route.snapshot.params['id'];
    const url = environment.baseUrl + `api/Authors/${authorId}`;
    this.http.get<any>(url).subscribe(
      (result) => {
        this.author = result;
        this.getAuthorWorks(authorId);
      },
      (error) => {
        if (error.status === 404) {
          this.router.navigateByUrl('/404');
        } else {
          console.log('Error occurred:', error);
        }
      }
    );
  }

  getAuthorWorks(authorId: number): void {
    const url = environment.baseUrl + `api/Authors/Works/${authorId}`;
    this.http.get<Book[]>(url).subscribe(
      (result) => {
        this.books = result;
      },
      (error) => {
        console.log('Error occurred:', error);
      }
    );
  }
}
