import {ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddBookComponent } from "../books/add-book/add-book.component";

@Component({
    selector: "app-header",
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {


    readonly dialog = inject(MatDialog);

    openDialog() {
      const dialogRef = this.dialog.open(AddBookComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
}