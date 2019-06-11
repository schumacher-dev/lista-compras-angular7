import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-lista-dialog',
  templateUrl: './lista-dialog.component.html',
  styleUrls: ['./lista-dialog.component.css']
})
export class ListaDialogComponent implements OnInit {

  options: FormGroup;
  model: any = {};

  constructor(
    public dialogRef: MatDialogRef<ListaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder,
    private api: APIService
    ) {
    this.options = this.fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });

    this.model = { ...this.dialogData };
  }

  ngOnInit() {
  }

  async save() {
    console.log(this.model);
    if (this.model.id) {
      this.api.update('lista', {
        params: {
          set: {
            nome: this.model.nome
          },
          where: {
            id: this.model.id 
          }
        }
      }).subscribe(prod => {
        console.log('Lista Atualizada', prod);
        this.dialogRef.close({ data: prod, update: true });
      });
    } else {
      this.api.create('lista', {
        data: this.model
      }).subscribe(prod => {
        console.log('Lista cadastrada', prod);
        this.dialogRef.close({ data: prod, update: true });
      });
    }
    
  }

}
