import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "proyecto-facturas-cc3f0", appId: "1:327707055045:web:6135b44b0a83cfef5f31ac", databaseURL: "https://proyecto-facturas-cc3f0-default-rtdb.europe-west1.firebasedatabase.app", storageBucket: "proyecto-facturas-cc3f0.firebasestorage.app", apiKey: "AIzaSyB2VUq8ke7LdEo52j6Tb6NbB9NYRom0_Hk", authDomain: "proyecto-facturas-cc3f0.firebaseapp.com", messagingSenderId: "327707055045" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
