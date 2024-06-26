import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import {
//   MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
//   MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule
// } from '@angular/material';


import {MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreateUserComponent } from './auth/create-user/create-user.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './header/header.component';
import { MatTabsModule } from '@angular/material/tabs';
import { GetBookComponent } from './books/get-book/get-book.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { MatDialogRef } from '@angular/material/dialog';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AuthInterceptor } from './auth/auth-interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    HeaderComponent,
    GetBookComponent,
    AddBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule, 
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
    {
    provide: MatDialogRef,
    useValue: {}
    },
    {
       provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true
      },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
