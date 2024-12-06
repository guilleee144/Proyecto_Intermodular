<script>
    import { products, salesHistory } from '../stores/store.js';
    import jsPDF from "jspdf";
    import 'jspdf-autotable';

    const TopVentas = () => {
        const counts = $salesHistory.reduce((acc, item) => {
            acc[item.name] = (acc[item.name] || 0) + item.quantity;
            return acc;
        }, {});
        return Object.entries(counts).sort((a, b) => b[1] - a[1]);
    };

    const generatePDF = () => { 
        const doc = new jsPDF();
        doc.text('Informe de Ventas', 20, 20);

        const salesHeaders = [["Producto", "Cantidad"]];
        const salesRows = $salesHistory.map(sale => [sale.name, sale.stock]);

        // @ts-ignore
        doc.autoTable({
            head: salesHeaders,
            body: salesRows,
            startY: 30,
        });

        const topSalesHeaders = [["Producto", "Unidades Vendidas"]];
        const topSalesRows = TopVentas();

        // @ts-ignore
        doc.autoTable({
            head: topSalesHeaders,
            body: topSalesRows,
        });

        doc.save('Informe-de-Ventas.pdf');
    };
</script>

<div class="sales-report">
    <h2>📊 Informe de Ventas</h2>

    <!-- Historial de Ventas -->
    <section class="section">
        <h3>Historial de Ventas</h3>
        <div class="report-cards">
            {#each $products as sale}
                <div class="report-card">
                    <div class="report-info">
                        <h4 class="product-name">{sale.name}</h4>
                        <p class="quantity">{sale.stock} unidades</p>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <!-- Productos más Vendidos -->
    <section class="section">
        <h3>🔥 Productos más Vendidos</h3>
        <div class="report-cards top-sales">
            {#each TopVentas() as [name, quantity]}
                <div class="report-card top-item">
                    <div class="report-info">
                        <h4 class="product-name">{name}</h4>
                        <p class="quantity">{quantity} unidades</p>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <button class="generate-btn" on:click={generatePDF}>📄 Generar PDF</button>
</div>

<style>
    :root {
        --primary-color: #2ecc71; /* Verde */
        --secondary-color: #f7fdf7; /* Fondo claro */
        --highlight-color: #27ae60; /* Verde oscuro */
        --text-color: #2c3e50;
        --border-radius: 8px;
        --box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }

    .sales-report {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
        background: var(--secondary-color);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        font-family: 'Arial', sans-serif;
        color: var(--text-color);
    }

    h2 {
        text-align: center;
        font-size: 2rem;
        color: var(--primary-color);
        margin-bottom: 20px;
    }

    .section {
        margin-bottom: 30px;
    }

    h3 {
        font-size: 1.5rem;
        color: var(--highlight-color);
        text-align: center;
        margin-bottom: 15px;
    }

    .report-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .report-item {
        background: white;
        padding: 15px;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: transform 0.2s ease-in-out;
    }

    .report-item:hover {
        transform: scale(1.02);
    }

    .top-sales .top-item {
        background: #d4edda;
    }

    .product-name {
        font-weight: bold;
        color: var(--highlight-color);
    }

    .quantity {
        font-size: 1rem;
        color: var(--text-color);
    }

    .generate-btn {
        display: block;
        margin: 20px auto;
        background: var(--highlight-color);
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: var(--border-radius);
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        text-transform: uppercase;
        transition: background 0.3s, transform 0.2s;
    }

    .generate-btn:hover {
        background: var(--primary-color);
        transform: translateY(-3px);
    }
</style>
