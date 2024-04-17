import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoBorraReporteComponent } from './dialogo-borra-reporte.component';

describe('DialogoBorraReporteComponent', () => {
  let component: DialogoBorraReporteComponent;
  let fixture: ComponentFixture<DialogoBorraReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoBorraReporteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogoBorraReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
