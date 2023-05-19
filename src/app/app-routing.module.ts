import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login.component';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { AuthorInfoComponent } from './author-info/author-info.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'author/:id', component: AuthorInfoComponent },
  { path: 'books', component: BooksComponent },
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent }, // Optional: If you want to have a specific 404 component
  { path: '**', redirectTo: '/404' }, // Wildcard route to handle unknown URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
