<script>
    import { products } from '../stores/store.js';
</script>

<div class="inventory">
    <h2>Control de Inventario</h2>

    <!-- Vista de productos en tarjetas -->
    <div class="product-cards">
        {#each $products as product}
            <div class="product-card">
                <div class="product-info">
                    <h3 class="product-name">{product.name}</h3>
                    <p class="price">€{product.price.toFixed(2)}</p>
                    <p class="stock">Unidades Disponibles: <span>{product.stock}</span></p>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    :root {
        --primary-color: #2ecc71; /* Verde */
        --secondary-color: #f7fdf7;
        --header-color: #27ae60;
        --text-color: #34495e;
        --highlight-color: #27ae60; /* Color verde para resaltar */
        --highlight-text: #2d3e50; /* Negro para el precio */
        --border-radius: 10px;
        --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .inventory {
        padding: 20px;
        max-width: 900px;
        margin: auto;
        background: var(--secondary-color);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        overflow: hidden; /* Elimina el scroll */
    }

    h2 {
        text-align: center;
        margin-bottom: 40px;
        font-size: xx-large;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .product-cards {
        display: flex;
        flex-direction: column; /* Las tarjetas una debajo de otra */
        gap: 20px;
        width: 95%; /* Ocupa el 95% del ancho */
        margin: auto; /* Centra las tarjetas */
    }

    .product-card {
        background: white;  
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        text-align: center;
        transition: transform 0.3s ease-in-out;
        width: 100%; /* Asegura que ocupe el 100% del contenedor */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    .product-info h3 {
        color: var(--highlight-color);
        font-size: 1.4rem;
        margin-bottom: 10px;
    }

    .product-info .price {
        font-size: 1.2rem;
        color: var(--highlight-text); /* Precio en negro */
        margin-bottom: 10px;
    }

    .product-info .stock {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--highlight-color);
    }

    .product-info .stock span {
        font-size: 1.6rem;
        color: black; /* Cantidad en negro */
    }

    /* Estilo de medios para pantallas pequeñas */
    @media (max-width: 768px) {
        .product-card {
            width: 100%;
        }
    }

    @media (max-width: 480px) {
        h2 {
            font-size: 1.6rem;
        }

        .product-info .stock {
            font-size: 1.3rem;
        }
    }
</style>
