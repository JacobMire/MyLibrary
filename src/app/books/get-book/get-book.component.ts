import {ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BooksService } from '../books.service';
import { Subscription } from 'rxjs';
import { PageEvent } from "@angular/material/paginator";
import { EditBookComponent } from "../edit-book/edit-book.component";



@Component({
  selector: 'app-get-book',
  templateUrl: './get-book.component.html',
  styleUrl: './get-book.component.css'
})
export class GetBookComponent implements OnInit{

  
  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  search: any="";
    

    private booksSub: Subscription = new Subscription;
    
    books: any  = [

        // {name:'harry potter', author:'JK rowling', date : new Date(1282-0o3-12) , price:'10', isDeleted: false},
        // {name:'marry potter', author:'MK rowling', date : new Date(1982-0o3-11) , price:'20', isDeleted: false},
        // {name:'tarry potter', author:'DK rowling', date : new Date(1382-0o3-12) , price:'30', isDeleted: false},
        // {name:'Larry potter', author:'PK rowling', date : new Date(1922-0o3-11) , price:'50', isDeleted: false},
        // {name:'Qarry potter', author:'LK rowling', date : new Date(2002-0o3-12) , price:'60', isDeleted: false}
          
          ]


        constructor(public dialog: MatDialog,public booksService: BooksService) {}

        ngOnInit(){
          console.log("hijodfjzvdf");
        this.booksService.getBooks(this.currentPage,this.search)
        // this.booksSub = this.booksService.getBookUpdateListener()
        .subscribe((response)=>{
          this.books = response.books;
          console.log(this.books);
          this.totalPosts=response.totalBooks;
        })
 
        }


        onChangedPage(pageData: PageEvent){
          this.currentPage = pageData.pageIndex + 1;
          this.postsPerPage = pageData.pageSize;        
          this.booksService.getBooks(this.currentPage,this.search)
        }
    

        onDelete(id:string){
          console.log("id::::"+id)
          this.booksService.deleteBook(id)
          window.location.reload()
        }   


    openDialog(book:any):void {
      if (!book) {
        console.error('No item to edit');
        return;
      }
      console.log('dialog opened')
      const dialogRef = this.dialog.open(EditBookComponent,{data:book});
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        if (result) {
          console.log(result.name+"from get book")
          this.booksService.editBook(book._id, result.name, result.author, result.date, result.price,).subscribe(response => {
            // const index = this.data.findIndex(i => i._id === response._id);
            // if (index !== -1) {
            //   this.books[index] = response;
            // }
            console.log('Data updated successfully', response);
          });
        }
        console.log(`Dialog result: ${result}`);
        window.location.reload();
      });
    
    }


}
