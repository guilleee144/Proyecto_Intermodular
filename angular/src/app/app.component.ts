import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule para ngModel
import { NavbarComponent } from './shared/navbar/navbar.component'; // ✅ Importar Navbar (si es standalone)

@Component({
  selector: 'app-root',
  standalone: true, // ✅ Agregado para componentes standalone
  imports: [CommonModule, RouterOutlet, NavbarComponent, FormsModule], // ✅ Importaciones correctas
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'intermodular-angular';
  userInput: string = ''; // Variable para ngModel
}
