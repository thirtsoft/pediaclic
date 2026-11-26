import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionnalitesPageComponent } from './fonctionnalites-page.component';

describe('FonctionnalitesPageComponent', () => {
  let component: FonctionnalitesPageComponent;
  let fixture: ComponentFixture<FonctionnalitesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FonctionnalitesPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FonctionnalitesPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
