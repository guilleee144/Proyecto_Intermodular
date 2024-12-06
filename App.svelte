<script>
  import './global.css'; 
  import { Router, Link, Route } from 'svelte-routing';
  //import { datosGlobales } from './stores/store.js'; // Importación del store

  // Importar las páginas
  import Inicio from './components/Inicio.svelte';
  import GestionPedidos from './components/GestionPedidos.svelte';
  import Inventario from './components/Inventario.svelte';
  import Reportes from './components/Reportes.svelte';

  let mostrarMenu = false;
</script>

<Router>
  <header>
    <div class="logo">Zippi Gestor</div>
    <ul class="nav-menu" class:activo={mostrarMenu}>
      <li><a href="/" class="nav-button">Inicio</a></li>
      <li><a href="/gestion-pedidos" class="nav-button">Pedidos</a></li>
      <li><a href="/inventario" class="nav-button">Inventario</a></li>
      <li><a href="/reportes" class="nav-button">Reportes</a></li>
    </ul>
  </header>

  <main>
    <Route path="/" component={Inicio} />
    <Route path="/gestion-pedidos" component={GestionPedidos} />
    <Route path="/inventario" component={Inventario} />
    <Route path="/reportes" component={Reportes} />
  </main>
</Router>

<style>
  /* Estilos del header */
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 1rem;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 40px;
  }

  .logo {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1abc9c;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .nav-menu {
    display: flex;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-menu li {
    list-style: none;
  }

  .nav-button {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #1abc9c;
    color: #ecf0f1;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .nav-button:hover {
    background-color: #16a085;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    color: #ffffff;
  }

  /* Estilos para pantallas pequeñas */
  @media (max-width: 768px) {
    

    .nav-menu {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      background-color: #34495e;
      width: 100%;
      padding: 1rem;
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    }

    .nav-menu.activo {
      display: flex;
    }

    .nav-menu li {
      margin: 0.5rem 0;
    }
  }

  /* Estilos del main */
  main {
    padding: 1.5rem;
    font-family: 'Verdana', sans-serif;
    background-color: #ecf0f1;
    min-height: 100vh;
  }
</style>
