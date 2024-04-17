import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroReportesComponent } from './registro-reportes.component';

describe('RegistroReportesComponent', () => {
  let component: RegistroReportesComponent;
  let fixture: ComponentFixture<RegistroReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroReportesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
