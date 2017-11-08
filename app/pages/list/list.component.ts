import { GroceryListService } from './../../shared/grocery/grocery-list.service';
import { Grocery } from './../../shared/grocery/grocery';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TextField } from "ui/text-field";

@Component({
  selector: "list",
  moduleId: module.id,
  providers: [GroceryListService],
  templateUrl: "./list.html",
  styleUrls: ["./list-common.css", "./list.css"]
})
export class ListComponent implements OnInit {
  groceryList: Array<Grocery> = [];
  grocery = "";
  isLoading = false;
  listLoaded = false;
  @ViewChild("groceryTextField") groceryTextField: ElementRef;

  constructor(private groceryListService: GroceryListService) {

  }
  ngOnInit() {
    this.isLoading = true;
    this.groceryListService.load().subscribe(loadedGroceries => {
      loadedGroceries.array.forEach((groceryObject) => {
        this.groceryList.unshift(groceryObject);
        this.isLoading = false;
        this.listLoaded = true;
      });
    });
  }

  add() {
    if (this.grocery.trim() === "") {
      alert("Enter a grocery item");
      return;
    }

    // Dismiss the keyboard
    let textField = <TextField>this.groceryTextField.nativeElement;
    textField.dismissSoftInput();

    this.groceryListService.add(this.grocery)
      .subscribe(
      groceryObject => {
        this.groceryList.unshift(groceryObject);
        this.grocery = "";
      },
      () => {
        alert({
          message: "An error occurred while adding an item to your list.",
          okButtonText: "OK"
        });
        this.grocery = "";
      }
      )
  }
}