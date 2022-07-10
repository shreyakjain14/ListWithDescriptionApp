import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './components/popup/popup.component';

interface List {
  name: string;
  date: Date;
  details: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private list: List[] = [
    {
      name: 'first list',
      date: new Date(),
      details: ['dummy data 1', 'dummy data 2', 'dummy data 3'],
    },
    {
      name: 'second list',
      date: new Date(),
      details: [
        'this is dummy data 1',
        'this is dummy data 2',
        'this is dummy data 3',
      ],
    },
    {
      name: 'third list',
      date: new Date(),
      details: [
        'this is some dummy data 1',
        'this is some dummy data 2',
        'this is some dummy data 3',
      ],
    },
  ];
  private dialogRef;
  private dialogSubscription;
  public activeList = [];
  public selectedItem;
  public details: string[];

  constructor(private dialog: MatDialog) {
    this.activeList = this.list;
  }

  search(event) {
    console.log('in search with event::: ', event);
    const value = event.target.value;
    this.activeList = this.list.filter(
      (item) => item.name.indexOf(value) !== -1
    );
  }

  openAddListDialog() {
    this.dialogRef = this.dialog.open(PopupComponent, {
      data: {
        isList: true,
        isAdd: true,
      },
    });

    this.dialogSubscription = this.dialogRef.afterClosed().subscribe((data) => {
      console.log('in afterClosed Subscription::: ', data);
      if (data) {
        this.list.push({ name: data.key, date: new Date(), details: [] });
      }
      this.dialogSubscription.unsubscribe();
    });
  }

  showDetails(list: List) {
    this.details = list.details;
  }

  selectItem(list: List) {
    this.selectedItem = list;
    this.details = this.selectedItem.details;
  }

  editList() {
    this.dialogRef = this.dialog.open(PopupComponent, {
      data: {
        isList: true,
        isAdd: false,
        key: this.selectedItem.name,
      },
    });

    this.dialogSubscription = this.dialogRef.afterClosed().subscribe((data) => {
      console.log('in afterClosed Subscription::: ', data);
      if (data) {
        this.selectedItem.name = data.key;
      }
      this.dialogSubscription.unsubscribe();
    });
  }

  deleteList() {
    this.activeList = this.activeList.filter(
      (item) => item !== this.selectedItem
    );
    this.list = this.list.filter((item) => item !== this.selectedItem);
    this.details = [];
  }

  addDetails() {
    this.dialogRef = this.dialog.open(PopupComponent, {
      data: {
        isList: false,
        isAdd: true,
      },
    });

    this.dialogSubscription = this.dialogRef.afterClosed().subscribe((data) => {
      console.log('in afterClosed Subscription::: ', data);
      if (data) {
        this.selectedItem.details.push(data.key);
      }
      this.dialogSubscription.unsubscribe();
    });
  }
}
