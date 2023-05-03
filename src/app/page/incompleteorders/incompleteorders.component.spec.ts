import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteordersComponent } from './incompleteorders.component';

describe('IncompleteordersComponent', () => {
  let component: IncompleteordersComponent;
  let fixture: ComponentFixture<IncompleteordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncompleteordersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncompleteordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
