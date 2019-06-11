import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaComponent } from './components/lista/lista.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListaActionComponent, OrderByPipe } from './components/lista-action/lista-action.component';
import { MatSidenavModule, MatIconModule, MatToolbarModule, MatButtonModule, MatListModule, MatGridListModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatCheckboxModule, MatOptionModule, MatRadioModule, MatSelectModule, MatCommonModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProdutoDialogComponent } from './components/produto-dialog/produto-dialog.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ListaDialogComponent } from './components/lista-dialog/lista-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    ListaActionComponent,
    ProdutoDialogComponent,
    ListaDialogComponent,
    OrderByPipe
  ],
  imports: [
    /** Angular Modules */
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    /** Material Modules */
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatOptionModule,
    MatRadioModule,
    MatSelectModule,
    MatCommonModule,
    MatInputModule,
    MatProgressBarModule
  ],
  providers: [
    FormBuilder
  ],
  entryComponents: [
    ProdutoDialogComponent,
    ListaDialogComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
