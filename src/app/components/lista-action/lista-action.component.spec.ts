import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaActionComponent } from './lista-action.component';

describe('ListaActionComponent', () => {
  let component: ListaActionComponent;
  let fixture: ComponentFixture<ListaActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
