import {ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddBookComponent } from "../books/add-book/add-book.component";
import { BooksService } from "../books/books.service";
import { PageEvent } from "@angular/material/paginator";

@Component({
    selector: "app-header",
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {


  constructor(public booksService: BooksService) {}

  postsPerPage = 5;
  currentPage = 1;
  search: any="";
  filteredBooks: any[] = [];
  books: any[] = [];
  isAdmin:boolean=false;
  totalPosts: any="";

    readonly dialog = inject(MatDialog);

    onChangedPage(pageData: PageEvent){
      this.currentPage = pageData.pageIndex + 1;
      this.postsPerPage = pageData.pageSize;        
      this.booksService.getBooks(this.currentPage,this.search)
  }
  onSearch(query: string): void {
    this.filteredBooks = this.books.filter(book => book.title.toLowerCase().includes(query.toLowerCase()));
  }


  nextPage(): void {
    this.currentPage++;
    this.loadBooks();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadBooks();
    }
  }
  onPageChange(event:PageEvent){
    this.currentPage=event.pageIndex+1;
    this.loadBooks();
  }


  loadBooks(): void {
    this.booksService.getBooks(this.currentPage,this.search).subscribe(
      (res) => {
        this.books = res.books;
        this.totalPosts=res.totalBooks;

      },
      err => {
        console.error('Error loading books', err);
      }
    );
  }



  onSearchBooks() {
    // console.log("form landing serach" +this.search);
    this.loadBooks();
  }

    openDialog() {
      const dialogRef = this.dialog.open(AddBookComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
}