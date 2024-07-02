import { Component,Inject,OnInit } from '@angular/core';
import { Book } from '../books.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { BooksService } from '../books.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-edit-book',
    templateUrl: './edit-book.component.html',
    styleUrl: './edit-book.component.css'
  })

export class EditBookComponent implements OnInit{

    newBook: Book = { name: '', author: '', date:new Date(), price: '' , isDeleted:false};
    private bookId = '';

    constructor(public dialogRef: MatDialogRef<EditBookComponent>, public booksService: BooksService,@Inject(MAT_DIALOG_DATA) public data: any, public route: ActivatedRoute) {
      
        if (!data) {
            console.error('No data received');
          } 
        
    }
  
    ngOnInit() {

        this.newBook.name=this.data.name;
        this.newBook.author=this.data.author;
        this.newBook.date=this.data.date;
        this.newBook.price=this.data.price;
        // this.route.paramMap.subscribe((paramMap: ParamMap) => {
        //     if(paramMap.has('bookId')){
        //         this.bookId = paramMap.get('bookId');
        //         this.booksService.getBook(this.bookId).subscribe(bookData => {
        //             this.newBook = {name: bookData.name, author: bookData.author, date: bookData.date, price: bookData.price, isDeleted: book};
        //         })

        //     }
        // });
        
    }
  
    async onSubmit(form: NgForm): Promise<void> {
    //   this.bookService.addBook(this.newBook).subscribe(newBook => {
    //     console.log('Added new book:', newBook);
    let book ={ name: form.value.name, author: form.value.author, date: form.value.date, price: form.value.price }
    console.log(book)
        this.dialogRef.close(book); // Close dialog and pass new book data\
        
    //   });
    await this.dialogRef.afterClosed().toPromise();

   // window.location.reload()
    }
  
    onCancel(): void {
      this.dialogRef.close(); // Close dialog without passing data
    }
}


