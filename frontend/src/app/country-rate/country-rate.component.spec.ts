import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryRateComponent } from './country-rate.component';

describe('CountryRateComponent', () => {
  let component: CountryRateComponent;
  let fixture: ComponentFixture<CountryRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
