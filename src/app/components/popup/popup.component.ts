import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  form: FormGroup;
  // key: string;

  constructor(
    private dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    console.log('in popup component:::', data);
    // if (this.data.isList) {
    //   this.key = 'name';
    // } else {
    //   this.key = 'description';
    // }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      key: new FormControl(this.data.key, Validators.required),
    });
    console.log('form::: ', this.form);
  }

  submitForm() {
    this.dialogRef.close(this.form.value);
  }
}
