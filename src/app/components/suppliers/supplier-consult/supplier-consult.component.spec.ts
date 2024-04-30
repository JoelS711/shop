import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierConsultComponent } from './supplier-consult.component';

describe('SupplierConsultComponent', () => {
  let component: SupplierConsultComponent;
  let fixture: ComponentFixture<SupplierConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierConsultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
