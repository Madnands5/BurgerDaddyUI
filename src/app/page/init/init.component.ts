import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss'],
})
export class InitComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  goToOrders() {
    this.router.navigate(['/orders']);
  }
}
