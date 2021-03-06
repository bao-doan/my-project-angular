import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Genre } from '../view-models/genre';
import { GenreService } from '../services/genre.service';
import { Book } from '../view-models/book';
import { BookService } from '../services/book.service';
import { CartService } from '../services/cart.service';
import { find } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ParamMap } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  componentTitle = 'Product Details';
  genres: Genre[];
  books: Book[];
  book: Book;
  book$: Observable<Book>;
  constructor(
    private genreService: GenreService,
    private bookService: BookService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {   }

  ngOnInit() {
    
    this.getGenres();
    this.getBooks();
    this.getBook();
    this.getBook$();
  }
  getGenres(): void {
    this.genreService.getGenres().subscribe(_ => this.genres = _);
  }
  getBooks(): void {
    this.bookService.getBooks().subscribe(_ => this.books = _);
  }
  getBook(): void {
    const id = this.route.snapshot.paramMap.get('_id');
    this.bookService.getBook(id)
      .subscribe(_ => {
        this.book = _;
        // this.showRelatedBook(_ , 3);
      });
  }
  getBook$(): void {
    this.book$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.bookService.getBook(params.get('_id')))
    );
  }
  inputQuantity: number = 1;
  addItem(book: Book) {
    this.cartService.addItem(book, this.inputQuantity);
  }
  relatedBook: Book[];
  // showRelatedBook(book: Book, step: number) {
  //   let find_book = this.books.find((_) => book._id == _._id);
  //   let index = this.books.findIndex((_) => book._id == _._id);
  //   step = 3;
  //   if (find_book) {
  //     if (index + step > this.books.length - 1) {

  //       this.relatedBook = this.books.slice(index, index + step);
  //     } else {
  //       this.relatedBook = this.books.slice(index, index + step);
  //     }

  //   }
  // }
  
}
