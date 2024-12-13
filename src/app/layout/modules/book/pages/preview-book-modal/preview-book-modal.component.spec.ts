import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewBookModalComponent } from './preview-book-modal.component';

describe('PreviewBookModalComponent', () => {
  let component: PreviewBookModalComponent;
  let fixture: ComponentFixture<PreviewBookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewBookModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
