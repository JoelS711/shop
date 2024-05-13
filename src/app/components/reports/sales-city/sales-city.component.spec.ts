import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCityComponent } from './sales-city.component';

describe('SalesCityComponent', () => {
  let component: SalesCityComponent;
  let fixture: ComponentFixture<SalesCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesCityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
