import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Importamos FormsModule
import { ProyectoService } from '../services/proyecto.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Asegurar FormsModule en imports
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss']
})
export class ProyectosComponent implements OnInit {
  proyectos$: Observable<any[]> = new Observable(); // ✅ Observable de proyectos
  editandoProyecto: { id: string; nombre: string; tecnologiasInput: string } | null = null; // ✅ Inicialización correcta

  constructor(private proyectoService: ProyectoService) {}

  ngOnInit(): void {
    // ✅ Cargar los proyectos desde Firebase
    this.proyectos$ = this.proyectoService.getProyectos();
  }

  eliminarProyecto(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      this.proyectoService.deleteProyecto(id)
        .then(() => console.log("✅ Proyecto eliminado"))
        .catch(error => console.error("❌ Error al eliminar proyecto:", error));
    }
  }

  editarProyecto(proyecto: any) {
    this.editandoProyecto = {
      id: proyecto.id || '',
      nombre: proyecto.nombre || '',
      tecnologiasInput: Array.isArray(proyecto.tecnologias) ? proyecto.tecnologias.join(', ') : ''
    };
  }

  guardarEdicion() {
    if (this.editandoProyecto) {
      const { id, nombre, tecnologiasInput } = this.editandoProyecto;
      if (!nombre.trim() || !tecnologiasInput.trim()) {
        alert("⚠️ Todos los campos son obligatorios.");
        return;
      }

      const tecnologiasArray: string[] = tecnologiasInput.split(',').map((t: string) => t.trim());

      this.proyectoService.updateProyecto(id, { nombre, tecnologias: tecnologiasArray })
        .then(() => {
          console.log("✅ Proyecto actualizado");
          this.editandoProyecto = null;
        })
        .catch(error => console.error("❌ Error al actualizar:", error));
    }
  }

  cancelarEdicion() {
    this.editandoProyecto = null;
  }
}
