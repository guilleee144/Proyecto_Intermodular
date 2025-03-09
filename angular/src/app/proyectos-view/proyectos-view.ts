import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ProyectoService } from '../services/proyecto.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router'; // ✅ Importamos RouterModule para las rutas

@Component({
  selector: 'app-proyectos-view',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ Se agrega RouterModule
  templateUrl: './proyectos-view.html',
  styleUrls: ['./proyectos-view.scss']
})
export class ProyectosViewComponent implements OnInit {
  public userEmail: string | null = null;
  nuevoProyecto: string = "";
  tecnologiasInput: string = "";
  proyectos$: Observable<any[]>; // ✅ Observable para obtener proyectos en tiempo real

  constructor(private authService: AuthService, private proyectoService: ProyectoService) {
    this.proyectos$ = this.proyectoService.getProyectos();
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((user: any) => {
      this.userEmail = user ? user.email : null;
    });
  }

  agregarProyecto() {
    if (this.nuevoProyecto.trim() && this.tecnologiasInput.trim()) {
      const tecnologiasArray = this.tecnologiasInput.split(',').map(t => t.trim());

      this.proyectoService.addProyecto(this.nuevoProyecto, tecnologiasArray)
        .then(() => {
          console.log("✅ Proyecto agregado a Firestore.");
          this.nuevoProyecto = "";
          this.tecnologiasInput = "";
        })
        .catch(error => console.error("❌ Error al agregar el proyecto:", error));
    }
  }

  eliminarProyecto(id: string) {
    this.proyectoService.deleteProyecto(id)
      .then(() => console.log(`✅ Proyecto ${id} eliminado.`))
      .catch(error => console.error("❌ Error al eliminar el proyecto:", error));
  }

}
