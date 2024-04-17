import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoActualizarUsuarioComponent } from './dialogo-actualizar-usuario.component';

describe('DialogoActualizarUsuarioComponent', () => {
  let component: DialogoActualizarUsuarioComponent;
  let fixture: ComponentFixture<DialogoActualizarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoActualizarUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogoActualizarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
