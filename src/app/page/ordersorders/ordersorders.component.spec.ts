import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersordersComponent } from './ordersorders.component';

describe('OrdersordersComponent', () => {
  let component: OrdersordersComponent;
  let fixture: ComponentFixture<OrdersordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersordersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
