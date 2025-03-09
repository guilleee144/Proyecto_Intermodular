import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProyectoService } from '../services/proyecto.service';
import { Observable } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  proyectos$: Observable<any[]>; 
  proyectos: any[] = []; 
  charts: Chart[] = []; 

  facturasVenta = 3;
  facturasCompra = 2;
  facturas: any[] = []; // 🔥 Almacena las facturas extraídas de Firebase
  facturasChart!: Chart;
  saldosChart!: Chart;

  @ViewChildren('chartCanvas') chartRefs!: QueryList<ElementRef<HTMLCanvasElement>>;
  @ViewChild('facturasChart', { static: false }) facturasChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('saldosChart', { static: false }) saldosChartRef!: ElementRef<HTMLCanvasElement>;

  private firestore = inject(AngularFirestore); // ✅ Forma correcta de inyectar en Angular 15+

  constructor(private proyectoService: ProyectoService) {
    this.proyectos$ = this.proyectoService.getProyectos();
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.proyectos$.subscribe(proyectos => {
      this.proyectos = proyectos;
      console.log("📊 Proyectos obtenidos:", this.proyectos);
    });

    setTimeout(() => {
      this.obtenerFacturas(); // 🔥 Se asegura que Firestore se consulte después de inicializar el componente
    }, 500);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.generarGraficas();
      this.generarGraficaFacturas();
      this.generarGraficaSaldos();
    }, 1000);
  }

  obtenerFacturas() {
    this.firestore.collection('facturas').get().subscribe(snapshot => {
      this.facturas = [];
      this.facturasVenta = 3;
      this.facturasCompra = 4;

      snapshot.forEach(doc => {
        const data = doc.data() as { baseImponible?: number, total?: number, tipoFactura?: string };

        if (data && typeof data.baseImponible === 'number' && typeof data.total === 'number' && data.tipoFactura) {
          this.facturas.push(data);
          if (data.tipoFactura === 'Venta') {
            this.facturasVenta++;
          } else if (data.tipoFactura === 'Compra') {
            this.facturasCompra++;
          }
        }
      });

      console.log("📄 Facturas obtenidas de Firebase:", this.facturas);
      this.generarGraficaFacturas();
      this.generarGraficaSaldos();
    }, error => {
      console.error("❌ Error al obtener facturas desde Firestore:", error);
    });
  }

  generarGraficas() {
    if (!this.chartRefs || this.chartRefs.length === 0) {
      console.error("❌ No se encontraron elementos <canvas> para generar gráficas.");
      return;
    }

    this.chartRefs.forEach((chartElement, index) => {
      if (index >= this.proyectos.length) return;

      if (this.charts[index]) {
        this.charts[index].destroy();
      }

      let labels = this.proyectos[index]?.tecnologias || ['Sin datos'];
      let dataValues = labels.map(() => Math.floor(Math.random() * 50) + 10);

      if (dataValues.length < 3) {
        dataValues.push(Math.floor(Math.random() * 50) + 10);
        labels.push(`Extra ${dataValues.length}`); 
      }

      this.charts[index] = new Chart(chartElement.nativeElement, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: this.proyectos[index]?.nombre || 'Proyecto',
            data: dataValues, 
            borderColor: '#00aaff',
            borderWidth: 2,
            fill: true,
            backgroundColor: 'rgba(0, 170, 255, 0.2)',
            tension: 0.5, 
            spanGaps: true, 
            cubicInterpolationMode: 'monotone'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: { tension: 0.5 },
            point: { radius: 3, hoverRadius: 5 }
          },
          scales: {
            x: { ticks: { color: '#fff' }, grid: { display: false } }, 
            y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
          }
        }
      });
    });
  }

  generarGraficaFacturas() {
    if (!this.facturasChartRef || !this.facturasChartRef.nativeElement) {
      console.error("❌ No se encontró el canvas de la gráfica de facturas.");
      return;
    }

    const ctx = this.facturasChartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error("❌ No se pudo obtener el contexto del canvas.");
      return;
    }

    if (this.facturasChart) {
      this.facturasChart.destroy();
    }

    this.facturasChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ventas', 'Compras'],
        datasets: [{
          label: 'Facturas por Tipo',
          data: [this.facturasVenta, this.facturasCompra],
          backgroundColor: ['#00ff99', '#ff5733'],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, labels: { color: '#fff' } }
        },
        scales: {
          x: { ticks: { color: '#fff' }, grid: { display: false } },
          y: { ticks: { color: '#fff', stepSize: 1 }, beginAtZero: true, grid: { color: 'rgba(255,255,255,0.2)' } }
        }
      }
    });
  }

  generarGraficaSaldos() {
    if (!this.saldosChartRef || !this.saldosChartRef.nativeElement) {
      console.error("❌ No se encontró el canvas de la gráfica de saldos.");
      return;
    }

    const ctx = this.saldosChartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error("❌ No se pudo obtener el contexto del canvas.");
      return;
    }

    if (this.saldosChart) {
      this.saldosChart.destroy();
    }

    const ingresos = this.facturas.filter(f => f.tipoFactura === 'Venta').reduce((acc, f) => acc + f.total, 0);
    const gastos = this.facturas.filter(f => f.tipoFactura === 'Compra').reduce((acc, f) => acc + f.total, 0);

    this.saldosChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ingresos', 'Gastos'],
        datasets: [{
          label: 'Saldos de Facturas',
          data: [ingresos, gastos],
          backgroundColor: ['#00ff99', '#ff5733'],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, labels: { color: '#fff' } }
        },
        scales: {
          x: { ticks: { color: '#fff' }, grid: { display: false } },
          y: { ticks: { color: '#fff', stepSize: 100 }, beginAtZero: true, grid: { color: 'rgba(255,255,255,0.2)' } }
        }
      }
    });
  }
}
