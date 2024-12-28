import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursSettingComponent } from './hours-setting.component';

describe('HoursSettingComponent', () => {
  let component: HoursSettingComponent;
  let fixture: ComponentFixture<HoursSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoursSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoursSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
