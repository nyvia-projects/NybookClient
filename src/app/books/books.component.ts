import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  public books!: Book[];
  public editedBook: Book | null = null;
  public newBook: Book | null = null;
  public showEditFormPopup = false;
  public showAddFormPopup = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    const url = environment.baseUrl + 'api/Books';
    this.http.get<Book[]>(url).subscribe(
      (result) => {
        this.books = result;
      },
      (error) => {
        console.log('Error occurred:', error);
      }
    );
  }

  startAddingBook() {
    this.newBook = {
      id: 0,
      title: '',
      year: 0,
      rating: 0,
      authorId: 0,
    };
    this.showAddFormPopup = true;
  }

  addBook() {
    if (this.newBook) {
      const url = environment.baseUrl + `api/Books`;
      this.http.post(url, this.newBook).subscribe(
        () => {
          this.loadBooks();
          this.cancelAdd();
        },
        (error) => {
          console.log('Error occurred:', error);
        }
      );
    }
  }

  cancelAdd() {
    this.newBook = null;
    this.showAddFormPopup = false;
  }

  editBook(book: Book) {
    this.editedBook = { ...book };
    this.showEditFormPopup = true;
  }

  saveEditedBook() {
    if (this.editedBook) {
      const url = environment.baseUrl + `api/Books/${this.editedBook.id}`;
      this.http.put(url, this.editedBook).subscribe(
        () => {
          this.loadBooks();
          this.cancelEdit();
        },
        (error) => {
          console.log('Error occurred:', error);
        }
      );
    }
  }

  cancelEdit() {
    this.editedBook = null;
    this.showEditFormPopup = false;
  }

  removeBook(book: Book) {
    const url = environment.baseUrl + `api/Books/${book.id}`;
    this.http.delete(url).subscribe(
      () => {
        this.loadBooks();
      },
      (error) => {
        console.log('Error occurred:', error);
      }
    );
  }
}
