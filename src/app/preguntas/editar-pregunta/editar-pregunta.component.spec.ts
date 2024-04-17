import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPreguntaComponent } from './editar-pregunta.component';

describe('EditarPreguntaComponent', () => {
  let component: EditarPreguntaComponent;
  let fixture: ComponentFixture<EditarPreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPreguntaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
