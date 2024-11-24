import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPackageModalComponent } from './edit-package-modal.component';

describe('EditPackageModalComponent', () => {
  let component: EditPackageModalComponent;
  let fixture: ComponentFixture<EditPackageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPackageModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPackageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
