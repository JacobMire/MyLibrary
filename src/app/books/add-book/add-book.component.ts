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

    selectedDate: string = '';
  
    date =''


    onDateChanged(value: any): void {
      this.date = value.target.value
      
      //if(this.date.)
      let currDate= new Date()
      let date= new Date(this.date)
      if(date>currDate){
        this.date = currDate.toISOString().substring(0, 10);
      }
      console.log("EVEENT ",this.date);
      
      
      // let year=value.slice(0,4)
      // if (+year>2024) {
      //   const updatedValue = '2024' + value.substring(4); 
      //   (document.getElementById('dateInput') as HTMLInputElement).value = updatedValue;
      // }
    }
  
    onSubmit(form: NgForm): void {
        console.log(form.value)
        if(form.value.name.length < 3 || form.value.price <= 200){
          alert("error")
        }
        else{
        this.booksService.addBook(form.value.name,form.value.author,form.value.date,form.value.price,)
        window.location.reload()

    //   this.bookService.addBook(this.newBook).subscribe(newBook => {
    //     console.log('Added new book:', newBook);
        this.dialogRef.close(this.newBook); // Close dialog and pass new book data
    //   });
        }  
  }
  
    onCancel(): void {
      this.dialogRef.close(); // Close dialog without passing data
    }
  }


