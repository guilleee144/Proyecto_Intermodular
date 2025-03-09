import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app'; // Importamos firebase para manejar usuarios de Firebase

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore // 📌 Conexión con Firestore
  ) {}

  // ✅ Método de REGISTRO en Firebase Auth y guardado en Firestore
  async register(email: string, password: string, nombre: string): Promise<void> {
    try {
      console.log(`📌 Registrando usuario: ${nombre} con email: ${email}`);

      // 📌 Registrar usuario en Firebase Authentication
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user?.uid;

      if (uid) {
        // 📌 Guardar información del usuario en Firestore
        await this.afs.collection("users").doc(uid).set({
          uid,
          email,
          nombre,
          fechaRegistro: new Date()
        });

        console.log("✅ Usuario registrado y guardado en Firestore:", email);
      }
    } catch (error: any) {
      console.error("❌ Error en el registro:", error.message);
      throw new Error(error.message);
    }
  }

  // ✅ Método de LOGIN con Firebase Authentication
  async login(email: string, password: string): Promise<any> {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // ✅ Método de LOGOUT (Cerrar sesión)
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log("✅ Sesión cerrada correctamente.");
    } catch (error: any) {
      console.error("❌ Error al cerrar sesión:", error.message);
      throw new Error(error.message);
    }
  }

  // ✅ Método para verificar si un usuario está autenticado
  isAuthenticated(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }
}
