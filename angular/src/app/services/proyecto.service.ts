import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, deleteDoc, updateDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private proyectosCollection;

  constructor(private firestore: Firestore) {
    this.proyectosCollection = collection(this.firestore, 'proyectos');
  }

  // ✅ Método para agregar un nuevo proyecto a Firebase
  addProyecto(nombre: string, tecnologias: string[]): Promise<void> {
    return addDoc(this.proyectosCollection, { nombre, tecnologias })
      .then(() => console.log('✅ Proyecto agregado con éxito'))
      .catch(error => console.error('❌ Error al agregar proyecto:', error));
  }

  // ✅ Método para obtener los proyectos en tiempo real
  getProyectos(): Observable<any[]> {
    return collectionData(this.proyectosCollection, { idField: 'id' });
  }

  // ✅ Método para eliminar un proyecto de Firebase
  deleteProyecto(id: string): Promise<void> {
    const proyectoDoc = doc(this.firestore, `proyectos/${id}`);
    return deleteDoc(proyectoDoc)
      .then(() => console.log('✅ Proyecto eliminado'))
      .catch(error => console.error('❌ Error al eliminar proyecto:', error));
  }

  // ✅ Método para actualizar un proyecto en Firebase
  updateProyecto(id: string, data: any): Promise<void> {
    const proyectoDoc = doc(this.firestore, `proyectos/${id}`);
    return updateDoc(proyectoDoc, data)
      .then(() => console.log('✅ Proyecto actualizado'))
      .catch(error => console.error('❌ Error al actualizar proyecto:', error));
  }
}
