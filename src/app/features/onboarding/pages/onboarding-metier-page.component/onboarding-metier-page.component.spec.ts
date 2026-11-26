import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingMetierPageComponent } from './onboarding-metier-page.component';

describe('OnboardingMetierPageComponent', () => {
  let component: OnboardingMetierPageComponent;
  let fixture: ComponentFixture<OnboardingMetierPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingMetierPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingMetierPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
