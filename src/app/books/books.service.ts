import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Book } from "./books.model"
import { Observable, Subject } from 'rxjs'
import { map } from "rxjs";


@Injectable({providedIn: 'root'})
export class BooksService{
   private books: Book[] = [];

    private booksUpdated = new Subject<Book[]>();

    constructor(private http: HttpClient ) {

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
//     getBooks(postsPerPage: number, currentPage: number):Observable<any>{
//       const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
//    return  this.http.get<{message: string, posts: any}>("http://localhost:3000/api/book"+ queryParams)
//   //   .subscribe((books) => {
//   //     this.books = books;
//   //     this.booksUpdated.next([...this.books])
//   //    console.log(books)
//   // });
// }


    getBooks(page: number,search:string): Observable<any> {
   // const token = this.authService.getToken(); // Assuming authService.getToken() retrieves the JWT token
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = { page: page.toString() ,search: search};
    console.log("book.service")
    return this.http.get<any>("http://localhost:3000/api/book", { params });
  }



    deleteBook(id: string){
      return this.http.delete("http://localhost:3000/api/book/" + id)
      .subscribe(response=>{
        console.log("deleted "+response)
      })

    }



    getBook(id: string){
      return this.http.get(
          "http://localhost:3000/api/book/" + id
      );
    }

    //bookId: string,name: string ,author: string, date: Date, price: string
    editBook(bookId: string,name: string ,author: string, date: Date, price: string){
      const book: Book ={ name: name ,author: author, date: date, price: price, isDeleted:false}
      return this.http.put("http://localhost:3000/api/book/" + bookId
      ,book);
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

