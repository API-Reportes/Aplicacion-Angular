import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoBorrarPreguntaComponent } from './dialogo-borrar-pregunta.component';

describe('DialogoBorrarPreguntaComponent', () => {
  let component: DialogoBorrarPreguntaComponent;
  let fixture: ComponentFixture<DialogoBorrarPreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoBorrarPreguntaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogoBorrarPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
