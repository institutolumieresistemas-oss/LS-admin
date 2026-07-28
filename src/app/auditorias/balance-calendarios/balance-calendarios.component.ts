import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { BalanceCalendariosService } from '../../servicios/balance-calendarios.service';

@Component({
  selector: 'app-balance-calendarios',
  templateUrl: './balance-calendarios.component.html',
  styleUrl: './balance-calendarios.component.css'
})
export class BalanceCalendariosComponent implements OnInit {
  cargando = false;
  balances: any[] = [];

  constructor(
    public generales: GeneralesService,
    private balanceService: BalanceCalendariosService
  ) {}

  ngOnInit() {
    this.cargarBalances();
  }

  cargarBalances() {
    this.cargando = true;
    this.balanceService.obtener().subscribe(
      (respuesta: any) => {
        this.balances = respuesta || [];
        this.cargando = false;
      },
      (error) => {
        this.cargando = false;
        this.generales.interpretarError(error);
      }
    );
  }
}
