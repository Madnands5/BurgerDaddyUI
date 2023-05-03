import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitComponent } from './page/init/init.component';
import { OrdersordersComponent } from './page/ordersorders/ordersorders.component';

const routes: Routes = [
  {
    path: '',
    component: InitComponent,
  },
  {
    path: 'orders',
    component: OrdersordersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
