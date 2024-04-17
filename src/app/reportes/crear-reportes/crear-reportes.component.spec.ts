import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearReportesComponent } from './crear-reportes.component';

describe('CrearReportesComponent', () => {
  let component: CrearReportesComponent;
  let fixture: ComponentFixture<CrearReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearReportesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
