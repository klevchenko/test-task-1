import {Component, OnInit} from "@angular/core";
import { FormGroup, FormArray, FormBuilder, FormControl } from "@angular/forms";

@Component({
  selector: "app-income",
  templateUrl: "income.component.html",
  styleUrls: ["income.component.scss"]
})
export class IncomeComponent implements OnInit {

  ngOnInit() {
  }

  incomeDataKeys = [
    'Золото',
    'Серебро',
    'Рубини',
    'Алмази',
  ];

  editMode: boolean;
  savedIncomeData: any;
  incomeDataForm: FormGroup;

  constructor(private fb:FormBuilder) {

    this.editMode = false;

    this.incomeDataForm = this.fb.group({
      incomeData: this.fb.array([]) ,
    });

    this.savedIncomeData = JSON.parse(<string>sessionStorage.getItem('incomeData'));

    if(this.savedIncomeData?.length){
      for (const i in this.savedIncomeData) {
        this.addIncomeData(this.savedIncomeData[i].key, this.savedIncomeData[i].val);
      }
    }
  }

  get incomeData() : FormArray {
    return this.incomeDataForm.get("incomeData") as FormArray
  }

  newIncomeData(key = '', val = ''): FormGroup {
    return this.fb.group({
      key: key,
      val: val,
    })
  }

  addIncomeData(key = '', val = '') {
    this.incomeData.push(this.newIncomeData(key, val));
  }

  removeIncomeData(i:number) {
    this.incomeData.removeAt(i);
  }

  onSubmit() {

    this.editMode = false;

    sessionStorage.setItem('incomeData',JSON.stringify(this.incomeDataForm.value.incomeData));
    this.savedIncomeData = JSON.parse(<string>sessionStorage.getItem('incomeData'));
    console.log(this.incomeDataForm.value.incomeData);
  }

  displayedColumns: string[] = ['key', 'val'];

}
