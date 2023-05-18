import { Component, OnInit } from '@angular/core';
import { Author } from './author';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent implements OnInit {
  public authors!: Author[];
  public editedAuthor: Author | null = null;
  public newAuthor: Author | null = null;
  public showEditFormPopup = false;
  public showAddFormPopup = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors() {
    const url = environment.baseUrl + 'api/Authors';
    this.http.get<Author[]>(url).subscribe(
      (result) => {
        this.authors = result;
      },
      (error) => {
        console.log('Error occurred:', error);
      }
    );
  }

  startAddingAuthor() {
    this.newAuthor = {
      id: 0,
      name: '',
      age: 0,
      rating: 0,
    };
    this.showAddFormPopup = true;
  }

  addAuthor() {
    if (this.newAuthor) {
      const url = environment.baseUrl + `api/Authors`;
      this.http.post(url, this.newAuthor).subscribe(
        () => {
          this.loadAuthors();
          this.cancelAdd();
        },
        (error) => {
          console.log('Error occurred:', error);
        }
      );
    }
  }

  cancelAdd() {
    this.newAuthor = null;
    this.showAddFormPopup = false;
  }

  editAuthor(author: Author) {
    this.editedAuthor = { ...author };
    this.showEditFormPopup = true;
  }

  saveEditedAuthor() {
    if (this.editedAuthor) {
      const url = environment.baseUrl + `api/Authors/${this.editedAuthor.id}`;
      this.http.put(url, this.editedAuthor).subscribe(
        () => {
          this.loadAuthors();
          this.cancelEdit();
        },
        (error) => {
          console.log('Error occurred:', error);
        }
      );
    }
  }

  cancelEdit() {
    this.editedAuthor = null;
    this.showEditFormPopup = false;
  }

  removeAuthor(author: Author) {
    const url = environment.baseUrl + `api/Authors/${author.id}`;
    this.http.delete(url).subscribe(
      () => {
        this.loadAuthors();
      },
      (error) => {
        console.log('Error occurred:', error);
      }
    );
  }
}
