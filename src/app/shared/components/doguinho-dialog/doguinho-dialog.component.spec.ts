import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoguinhoDialogComponent } from './doguinho-dialog.component';

describe('DoguinhoDialogComponent', () => {
  let component: DoguinhoDialogComponent;
  let fixture: ComponentFixture<DoguinhoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoguinhoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoguinhoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
