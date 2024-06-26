import { Component } from '@angular/core';
import { Book } from '../books.model';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { BooksService } from '../books.service';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {

    newBook: Book = { name: '', author: '', date:new Date(), price: '' , isDeleted:false}; // Initialize new book object

    constructor(public dialogRef: MatDialogRef<AddBookComponent>, public booksService: BooksService) {}
  
    ngOnInit(): void {
    }
  
    onSubmit(form: NgForm): void {
        console.log(form.value)
        this.booksService.addBook(form.value.name,form.value.author,form.value.date,form.value.price,)
    //   this.bookService.addBook(this.newBook).subscribe(newBook => {
    //     console.log('Added new book:', newBook);
        this.dialogRef.close(this.newBook); // Close dialog and pass new book data
    //   });
    }
  
    onCancel(): void {
      this.dialogRef.close(); // Close dialog without passing data
    }
  }


