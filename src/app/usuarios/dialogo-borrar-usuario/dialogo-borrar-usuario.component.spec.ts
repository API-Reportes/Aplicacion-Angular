import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoBorrarUsuarioComponent } from './dialogo-borrar-usuario.component';

describe('DialogoBorrarUsuarioComponent', () => {
  let component: DialogoBorrarUsuarioComponent;
  let fixture: ComponentFixture<DialogoBorrarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoBorrarUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogoBorrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
