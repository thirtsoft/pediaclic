import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerPatientComponent } from './editer-patient-component';

describe('EditerPatientComponent', () => {
  let component: EditerPatientComponent;
  let fixture: ComponentFixture<EditerPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditerPatientComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditerPatientComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
