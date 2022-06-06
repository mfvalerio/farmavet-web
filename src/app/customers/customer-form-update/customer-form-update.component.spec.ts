import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFormUpdateComponent } from './customer-form-update.component';

describe('CustomerFormUpdateComponent', () => {
  let component: CustomerFormUpdateComponent;
  let fixture: ComponentFixture<CustomerFormUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerFormUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
