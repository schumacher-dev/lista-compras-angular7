import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { faEdit, faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ProdutoDialogComponent } from '../produto-dialog/produto-dialog.component';

@Pipe({  name: 'orderBy' })
export class OrderByPipe implements PipeTransform {

    transform(records: Array<any>, args?: any): any {
      console.log(args);
        return records.sort(function(a, b){
            if(a[args.property] < b[args.property]){
                return -1 * args.direction;
            }
            else if( a[args.property] > b[args.property]){
                return 1 * args.direction;
            }
            else{
                return 0;
            }
        });
    };
}

@Component({
  selector: 'app-lista-action',
  templateUrl: './lista-action.component.html',
  styleUrls: ['./lista-action.component.sass']
})
export class ListaActionComponent implements OnInit {

  icons: any = {
    faEdit,
    faTrash,
    faPlus,
    faMinus
  }

  lista: {
    items: any[]
  };

  produtos: any[];

  constructor(
    private api: APIService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.getLista();
  }

  private getLista() {
    this.api.findOne('lista', {
      params: {
        attributes: ['id', 'nome'],
        where: {
          id: this.route.snapshot.params.listaId
        },
        include: [
          {
            model: 'produto',
            as: 'items',
            required: false
          }
        ]
      }
    }).subscribe(result => {
      this.lista = result;
      this.lista.items.forEach(item => {
        item.comprado = item['produto-lista'].comprado
      });

      this.getProduto();
    });
  }

  private getProduto() {
    let where = {};
    if (this.lista.items.length > 0) {
      where['id'] = { ['$notIn']: this.lista.items.map(item => item.id) };
    }

    this.api.findAll('produto', {
      params: {
        where: where
      }
    }).subscribe(result => {
      this.produtos = result;
      console.log(result);
    });
  }

  clearLista() {
    this.lista.items.forEach(item => {
      this.produtos.push(item);
    });

    this.lista.items = [];
  }

  addProduto(produto) {
    this.lista.items.push(produto);
    this.produtos.splice(
      this.produtos.findIndex(item => item.id == produto.id),
      1
    );
  }

  rmProdudoLista(produto) {
    this.produtos.push(produto);

    this.lista.items.splice(
      this.lista.items.findIndex(item => item.id == produto.id),
      1
    );
  }

  rmProduto(produto) {
    let ok = confirm('tem certeza que deseja excluir o prduto?');
    if (ok) {
      this.api.delete('produto', {
        params: {
          where: {
            id: produto.id
          }
        }
      }).subscribe(
        result => {
          this.produtos.splice(
            this.produtos.findIndex(item => item.id == produto.id),
            1
          );
          
          alert('Produto removido!');
        },
        err => {
          alert(`ERRO! - ${err.message}`)
        }
      )
    }
  }

  editProduto(produto) {
    this.openDialogProduto(produto);
  }

  newProduto() {
    this.openDialogProduto();
  }

  private openDialogProduto(data?: any) {
    let ref = this.dialog.open(ProdutoDialogComponent, { 
      width: '600px',
      data: data || {} 
    });
    ref.afterClosed().subscribe(a => {
      console.log('RETORNO DIALOG', a);
      if (a && a.update) {
        this.getProduto();
      }
    });
  }

  save() {
    this.api.main({
      manifest: [
        {
          model: 'produto-lista',
          method: 'delete',
          params: {
            where: {
              listaId: this.route.snapshot.params.listaId
            }
          }
        },
        {
          model: 'produto-lista',
          method: 'bulkCreate',
          data: this.lista.items.map(item => {
            return {
              listaId: this.route.snapshot.params.listaId,
              produtoId: item.id,
              comprado: item.comprado
            }
          })
        }
      ]
    }).subscribe(result => {
      alert('Todas as alterações foram salvas...');
    });
  }

}
