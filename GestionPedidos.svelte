<script>
    import { orders, products, salesHistory } from '../stores/store.js';

    let newOrder = { productId: null, quantity: 1 };
    let errorMessage = '';

    const addOrder = () => {
        products.update(current => {
            const product = current.find(p => p.id === newOrder.productId);
            if (product) {
                if (product.stock >= newOrder.quantity) {
                    product.stock -= newOrder.quantity;
                    orders.update(o => [...o, { ...product, quantity: newOrder.quantity }]);
                    salesHistory.update(h => [...h, { ...product, quantity: newOrder.quantity }]);
                    errorMessage = '';
                } else {
                    errorMessage = `No hay suficientes unidades del producto "${product.name}" en stock. Solo quedan disponibles: ${product.stock}.`;
                }
            }
            return current;
        });

        if (!errorMessage) {
            newOrder = { productId: null, quantity: 1 };
        }
    };
</script>

<div class="order-section">
    <h2>Registro de Pedidos</h2>
    <div class="form-container">
        <div class="form-item">
            <label for="product-select">Producto</label>
            <select id="product-select" bind:value={newOrder.productId}>
                <option value="" disabled selected>Selecciona un producto</option>
                {#each $products as product}
                    <option value={product.id}>{product.name} ({product.stock} disponibles)</option>
                {/each}
            </select>
        </div>
        <div class="form-item">
            <label for="quantity-input">Cantidad</label>
            <div class="input-wrapper">
                <input 
                    id="quantity-input" 
                    type="number" 
                    bind:value={newOrder.quantity} 
                    min="1" 
                    placeholder="Cantidad"
                />
            </div>
        </div>
        <button class="primary-btn" on:click={addOrder}>Registrar Pedido</button>
        {#if errorMessage}
            <p class="error-message">{errorMessage}</p>
        {/if}
    </div>

    <div class="order-list">
        <h3>Pedidos Registrados</h3>
        {#if $orders.length > 0}
            <ul>
                {#each $orders as order}
                    <li>
                        <span>{order.name} x {order.quantity}</span>
                    </li>
                {/each}
            </ul>
        {:else}
            <p class="no-orders">Aún no hay pedidos registrados.</p>
        {/if}
    </div>
</div>

<style>
    :root {
        --primary-color: #2ecc71;
        --secondary-color: #f7fdf7;
        --text-color: #34495e;
        --error-color: #e74c3c;
        --border-radius: 10px;
        --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .order-section {
        padding: 20px;
        max-width: 700px;
        margin: auto;
        background: var(--secondary-color);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
    }

    h2 {
        text-align: center;
        color: var(--primary-color);
        margin-bottom: 20px;
    }

    .form-container {
        display: grid;
        gap: 15px;
        padding: 20px;
        background: white;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        margin-bottom: 20px;
    }

    .form-item {
        display: flex;
        flex-direction: column;
    }

    label {
        font-size: 1rem;
        margin-bottom: 8px;
        font-weight: bold;
        color: var(--text-color);
    }

    select, input {
        padding: 12px;
        font-size: 1rem;
        border: 1px solid #ddd;
        border-radius: var(--border-radius);
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: border-color 0.3s, box-shadow 0.3s;
    }

    select:focus, input:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 6px rgba(46, 204, 113, 0.3);
        outline: none;
    }

    .primary-btn {
        width: 100%;
        padding: 12px;
        font-size: 1rem;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s;
    }

    .primary-btn:hover {
        background-color: #27ae60;
        transform: translateY(-2px);
    }

    .error-message {
        color: var(--error-color);
        font-size: 0.9rem;
        margin-top: 10px;
        text-align: center;
    }

    .order-list {
        padding: 20px;
        border-radius: var(--border-radius);
        background: white;
        box-shadow: var(--box-shadow);
    }

    .order-list h3 {
        color: var(--primary-color);
        text-align: center;
        margin-bottom: 15px;
    }

    .order-list ul {
        list-style: none;
        padding: 0;
    }

    .order-list ul li {
        padding: 10px;
        margin: 10px 0;
        background: var(--secondary-color);
        border: 1px solid #ddd;
        border-radius: var(--border-radius);
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: var(--box-shadow);
    }

    .no-orders {
        text-align: center;
        color: #666;
        font-size: 1rem;
        margin-top: 10px;
    }
</style>
