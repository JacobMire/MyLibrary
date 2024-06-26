import { Component, OnInit } from '@angular/core';
import { Book } from '../books.model';
import { BooksService } from '../books.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-get-book',
  templateUrl: './get-book.component.html',
  styleUrl: './get-book.component.css'
})
export class GetBookComponent implements OnInit{

    

    private booksSub: Subscription = new Subscription;
    
    books: Book[]  = [

        {name:'harry potter', author:'JK rowling', date : new Date(1282-0o3-12) , price:'10', isDeleted: false},
        {name:'marry potter', author:'MK rowling', date : new Date(1982-0o3-11) , price:'20', isDeleted: false},
        {name:'tarry potter', author:'DK rowling', date : new Date(1382-0o3-12) , price:'30', isDeleted: false},
        {name:'Larry potter', author:'PK rowling', date : new Date(1922-0o3-11) , price:'50', isDeleted: false},
        {name:'Qarry potter', author:'LK rowling', date : new Date(2002-0o3-12) , price:'60', isDeleted: false}
          
          ]


        constructor(public booksService: BooksService) {}

        ngOnInit(){

        //this.books = this.booksService.getBook();
 
        }


}
