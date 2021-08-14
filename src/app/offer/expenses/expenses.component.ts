import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  ngOnInit() {
  }

  expensesDataKeys = [
    'Золото',
    'Серебро',
    'Рубини',
    'Алмази',
  ];

  editMode: boolean;
  savedExpensesData: any;
  expensesDataForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.editMode = false;

    this.expensesDataForm = this.fb.group({
      googleStore: '',
      appleStore: '',
      windowsStore: '',
      expensesArr: this.fb.array([]),
    });
  }

  get expensesArr(): FormArray {
    return this.expensesDataForm.get("expensesArr") as FormArray
  }

  newExpensesData(key = '', val = ''): FormGroup {
    return this.fb.group({
      key: key,
      val: val,
    })
  }

  addExpensesData(key = '', val = '') {
    this.expensesArr.push(this.newExpensesData(key, val));
  }

  removeExpensesData(i: number) {
    this.expensesArr.removeAt(i);
  }

  onSubmit() {
    this.editMode = false;
    this.savedExpensesData = this.expensesDataForm.value.expensesArr;
    console.log(this.expensesDataForm.value);
  }

  displayedColumns: string[] = ['key', 'val'];

}
