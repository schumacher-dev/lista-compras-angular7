import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDialogComponent } from './lista-dialog.component';

describe('ListaDialogComponent', () => {
  let component: ListaDialogComponent;
  let fixture: ComponentFixture<ListaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
