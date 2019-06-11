import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ListaDialogComponent } from '../lista-dialog/lista-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  icons: any = {
    faEdit,
    faTrash
  }

  listas: any[];

  constructor(
    private api: APIService,
    private dialog: MatDialog
  ) {
    
  }

  ngOnInit() {
    this.loadListas();
  }

  loadListas() {
    // this.api.findAll('lista', {
    //   params: {
    //     where: {}
    //   }
    // }).subscribe(result => {
    //   this.listas = result;
    // });

    this.api.transaction('lista', {
      params: {
        where: {}
      }
    }).subscribe(result => {
      this.listas = result;
    });
  }

  newLista() {
    let ref = this.dialog.open(ListaDialogComponent, {
      width: '600px'
    });
    ref.afterClosed().subscribe(a => {
      this.loadListas();
    });
  }

  rmLista(lista) {
    let ok = confirm('tem certeza que deseja excluir a lista?');
    if (ok) {
      this.api.delete('lista', {
        params: {
          where: {
            id: lista.id
          }
        }
      }).subscribe(
        result => {
          this.listas.splice(
            this.listas.findIndex(item => item.id == lista.id),
            1
          );
          
          alert('Lista removida!');
        },
        err => {
          alert(`ERRO! - ${err.message}`)
        }
      )
    }
  }

}
