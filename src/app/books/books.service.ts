import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Book } from "./books.model"
import { User } from "../auth/user.model"
import { Subject } from 'rxjs'
import { map } from "rxjs";


@Injectable({providedIn: 'root'})
export class BooksService{
   books = [];

    private booksUpdated = new Subject<Book[]>();

    constructor(private http: HttpClient) {

    }


    getBookUpdateListener(){
      return this.booksUpdated.asObservable();
  }



    addBook(name: string ,author: string, date: Date, price: string){
      const books : Book = {name: name ,author: author, date: date, price: price, isDeleted:false }
      console.log(books)
      this.http.post("http://localhost:3000/api/book", books)
      .subscribe(response =>{
          console.log(response);
      })
  }

    getBook(){
    this.http.get("http://localhost:3000/api/book")
    .subscribe((bookss) => {
     console.log(bookss)
  });
}






    
    // addPost(title: string, content: string ) {
    //     const post: Post = {id: null, title: title, content: content};
    //     this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
    //     .subscribe((responseData)=> {
    //         const id = responseData.postId
    //         post.id=id;
    //         this.posts.push(post);
    //         this.postsUpdated.next([...this.posts]);
    //     });
        
    // }





}

