import { APIService } from '../../services/api.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-produto-dialog',
  templateUrl: './produto-dialog.component.html',
  styleUrls: ['./produto-dialog.component.css']
})
export class ProdutoDialogComponent implements OnInit {
  options: FormGroup;
  model: any = {};

  constructor(
    public dialogRef: MatDialogRef<ProdutoDialogComponent>,
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
      this.api.update('produto', {
        params: {
          set: {
            nome: this.model.nome
          },
          where: {
            id: this.model.id 
          }
        }
      }).subscribe(prod => {
        console.log('Produto atualizado', prod);
        this.dialogRef.close({ data: prod, update: true });
      });
    } else {
      this.api.create('produto', {
        data: this.model
      }).subscribe(prod => {
        console.log('Produto cadastrado', prod);
        this.dialogRef.close({ data: prod, update: true });
      });
    }
    
  }

}
