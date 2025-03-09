import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

  // ✅ Verificar si un correo electrónico ya está registrado en Firebase
  async emailExists(email: string): Promise<boolean> {
    try {
      const methods = await this.afAuth.fetchSignInMethodsForEmail(email);
      return methods.length > 0;
    } catch (error) {
      console.error("❌ Error al verificar el email:", error);
      return false;
    }
  }

  // ✅ Método para REGISTRAR usuario en Firebase y guardarlo en Firestore
  async register(email: string, password: string, nombre: string): Promise<any> {
    try {
      // 📌 Verificar si el email ya está registrado
      if (await this.emailExists(email)) {
        throw new Error("⚠️ El correo electrónico ya está registrado.");
      }

      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user?.uid;

      if (uid) {
        await this.afs.collection("users").doc(uid).set({
          uid,
          email,
          nombre,
          fechaRegistro: new Date()
        });
        console.log("✅ Usuario registrado y guardado en Firestore:", email);
      }
      
      return userCredential;
    } catch (error: any) {
      console.error("❌ Error en el registro:", error.message);
      throw new Error(error.message);
    }
  }

  // ✅ Método para INICIAR SESIÓN
  async login(email: string, password: string): Promise<any> {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // ✅ Método para CERRAR SESIÓN
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
  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => !!user));
  }

  // ✅ Método para obtener los datos de un usuario desde Firestore
  getUserData(uid: string): Promise<any> {
    return this.afs.collection("users").doc(uid).ref.get()
      .then(doc => doc.exists ? doc.data() : null)
      .catch(error => {
        console.error("❌ Error al obtener datos del usuario:", error);
        return null;
      });
  }

  // ✅ Obtener el usuario actual autenticado
  getCurrentUser(): Observable<firebase.User | null> {
    return this.afAuth.authState.pipe(first());
  }
}
