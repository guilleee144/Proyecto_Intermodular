<script>
    import { products } from '../stores/store.js';
    if (localStorage.getItem('products')) {
    products.set(JSON.parse(localStorage.getItem('products')));
}

products.subscribe(current => {
    localStorage.setItem('products', JSON.stringify(current));
});

    let newProduct = { id: null, name: '', price: 0, stock: 0 };
    let errorMessage = '';
    let editingProduct = null;
    let showForm = false;

    const toggleForm = () => {
        if (showForm) {
            // Al cerrar el formulario, limpia los valores
            newProduct = { id: null, name: '', price: 0, stock: 0 };
            editingProduct = null;
        }
        showForm = !showForm;
    };

    const addProduct = () => {
        if (newProduct.stock < 0) {
            errorMessage = 'El stock no puede ser un valor negativo.';
            return;
        }
        if (newProduct.name.trim() === '' || newProduct.price <= 0) {
            errorMessage = 'Por favor, ingrese un nombre válido y un precio mayor que cero.';
            return;
        }
        products.update(current => [
            ...current,
            {
                id: Date.now(),
                name: newProduct.name,
                price: newProduct.price,
                stock: newProduct.stock
            }
        ]);
        toggleForm(); // Cierra el formulario tras añadir el producto
        errorMessage = '';
    };

    const saveProduct = () => {
        if (newProduct.stock < 0) {
            errorMessage = 'El stock no puede ser un valor negativo.';
            return;
        }
        if (newProduct.name.trim() === '' || newProduct.price <= 0) {
            errorMessage = 'Por favor, ingrese un nombre válido y un precio mayor que cero.';
            return;
        }
        products.update(current => current.map(product =>
            product.id === newProduct.id ? newProduct : product
        ));
        toggleForm(); // Cierra el formulario tras guardar cambios
        errorMessage = '';
    };

    const removeProduct = (id) => {
        products.update(current => current.filter(product => product.id !== id));
    };

    const editProduct = (product) => {
        editingProduct = { ...product };
        newProduct = { ...product };
        showForm = true;
    };
</script>

<div class="product-management">
    <h1>¡Gestiona tus Productos!</h1>

    <!-- Vista de tarjetas para los productos -->
    <div class="product-cards">
        {#each $products as product}
            <div class="product-card">
                <div class="product-info">
                    <h3>{product.name}</h3>
                    <p class="price">€{product.price.toFixed(2)}</p>
                    <p class="stock">{product.stock} disponibles</p>
                </div>
                <div class="product-actions">
                    <button class="edit-btn" on:click={() => editProduct(product)}>✏️ Editar</button>
                    <button class="delete-btn" on:click={() => removeProduct(product.id)}>🗑️ Eliminar</button>
                </div>
            </div>
        {/each}
    </div>

    <!-- Botón flotante para añadir un producto -->
    <div class="add-product-button">
        <button on:click={toggleForm} class="fab-btn">{showForm ? '✖' : '+'}</button>
    </div>

    <!-- Formulario de añadir o editar producto -->
{#if showForm}
<div class="product-form">
    <h2>{editingProduct ? 'Editar Producto' : 'Añadir Producto'}</h2>
    <form class="styled-form" on:submit|preventDefault={editingProduct ? saveProduct : addProduct}>
        <div class="form-group">
            <label for="productName">Nombre del Producto</label>
            <input 
                id="productName" 
                type="text" 
                bind:value={newProduct.name} 
                placeholder="Ejemplo: Smartphone" 
                required 
            />
        </div>
        <div class="form-group">
            <label for="productPrice">Precio (€)</label>
            <input 
                id="productPrice" 
                type="number" 
                bind:value={newProduct.price} 
                min="0" 
                step="0.01" 
                placeholder="Ejemplo: 199.99" 
                required 
            />
        </div>
        <div class="form-group">
            <label for="productStock">Stock Inicial</label>
            <input 
                id="productStock" 
                type="number" 
                bind:value={newProduct.stock} 
                min="0" 
                placeholder="Ejemplo: 50" 
                required 
            />
        </div>
        <div class="form-buttons">
            <button class="save-btn" type="submit">
                {editingProduct ? 'Guardar Cambios' : 'Añadir Producto'}
            </button>
            <button class="cancel-btn" type="button" on:click={toggleForm}>Cancelar</button>
        </div>
    </form>
    {#if errorMessage}
        <p class="error-message">{errorMessage}</p>
    {/if}
</div>
{/if}
</div>

<style>
    :global(body) {
        font-family: 'Roboto', sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }

    .product-management {
        max-width: 900px;
        margin: 40px auto;
        padding: 20px;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    h1 {
        text-align: center;
        color: #333;
    }

    .product-cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        margin: 20px 0;
    }

    .product-card {
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 15px;
        text-align: center;
        width: calc(30% - 20px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .product-card h3 {
        color: #27ae60;
    }

    .add-product-button {
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }

    .fab-btn {
        background: #27ae60;
        color: white;
        font-size: 24px;
        border: none;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    }

    .fab-btn:hover {
        background: #2ecc71;
        transform: scale(1.1);
    }

    .fab-btn:active {
        transform: scale(1);
    }
    .product-form {
        background: #ffffff;
        border-radius: 12px;
        padding: 20px 25px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        margin: 20px auto;
        max-width: 500px;
        text-align: left;
    }

    .product-form h2 {
        font-size: 1.8rem;
        color: #27ae60;
        text-align: center;
        margin-bottom: 20px;
    }

    .styled-form .form-group {
        margin-bottom: 20px;
    }

    .styled-form .form-group label {
        font-size: 1.1rem;
        font-weight: bold;
        color: #333;
        display: block;
        margin-bottom: 8px;
    }

    .styled-form .form-group input {
        width: 95%;
        padding: 12px 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.3s ease;
        color: #555;
    }

    .styled-form .form-group input:focus {
        border-color: #27ae60;
        box-shadow: 0 0 8px rgba(39, 174, 96, 0.3);
        outline: none;
    }

    .styled-form .form-group input::placeholder {
        color: #aaa;
        font-style: italic;
    }

    .form-buttons {
        display: flex;
        justify-content: space-between;
        gap: 15px;
    }

    .save-btn, .cancel-btn {
        flex: 1;
        padding: 12px 20px;
        font-size: 1rem;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
    }

    .save-btn {
        background-color: #27ae60;
        color: white;
    }

    .save-btn:hover {
        background-color: #2ecc71;
    }

    .cancel-btn {
        background-color: #e74c3c;
        color: white;
    }

    .cancel-btn:hover {
        background-color: #ff6f61;
    }

    .error-message {
        color: #e74c3c;
        font-size: 0.9rem;
        margin-top: 15px;
        text-align: center;
    }
</style>
