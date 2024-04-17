import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoActualizarPreguntaComponent } from './dialogo-actualizar-pregunta.component';

describe('DialogoActualizarPreguntaComponent', () => {
  let component: DialogoActualizarPreguntaComponent;
  let fixture: ComponentFixture<DialogoActualizarPreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoActualizarPreguntaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogoActualizarPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
