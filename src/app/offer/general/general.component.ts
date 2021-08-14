import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  editMode: boolean;
  filePath: any;
  generalForm: FormGroup;

  constructor(public fb: FormBuilder) {
    this.editMode = false;

    this.generalForm = this.fb.group({
      img: [null],
      filename: [''],

      template: [null],
      language: [null],

      timeOfAction: '',
      offline: false

    })
  }

  ngOnInit(): void { }

  imagePreview(e:any) {
    const file = (e.target as HTMLInputElement)?.files?.[0];

    this.generalForm.patchValue({
      img: file
    });

    this.generalForm.get('img')?.updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file ?? new Blob())
  }

  templateFile(e:any) {
    this.generalForm.patchValue({
      template: (e.target as HTMLInputElement)?.files?.[0]
    });
  }

  languageFile(e:any) {
    this.generalForm.patchValue({
      language: (e.target as HTMLInputElement)?.files?.[0]
    });
  }

  onEdit() {
    this.editMode = true;
  }

  onCancel() {
    this.editMode = false;
  }

  submit() {
    this.editMode = false;
    console.log(this.generalForm.value)
  }

  removeImg() {

    this.filePath = null;

    this.generalForm.patchValue({
      img: [null],
      filename: [''],
    });
  }

}
