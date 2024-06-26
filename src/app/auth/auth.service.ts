import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./user.model";

@Injectable({providedIn: "root" })
export class AuthService{
    

    constructor(private http: HttpClient){}
    private token!: string;
    getToken(){
        return this.token;
    }

    createUser(name: string ,email: string, password: string, role: string){
        const user : User = {name: name ,email: email, password: password, role: role}
        console.log(user)
        this.http.post("http://localhost:3000/api/user/create",user)
        .subscribe(response =>{
            console.log(response);
        })
    }

    login(email: string, password : string){
        const user = {email:email, password:password}
        console.log(user)
        this.http.post<{token:string}>("http://localhost:3000/api/user/login",user)
        .subscribe(response =>{
            console.log(response);
            const token = response.token;
            this.token = token;
        })
    }
}