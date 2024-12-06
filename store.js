// store.js
import { writable } from 'svelte/store';

// Función para cargar el estado desde localStorage y suscribirse para guardarlo
function loadFromLocalStorage(store, key) {
    const storedData = localStorage.getItem(key);
    if (storedData) {
        store.set(JSON.parse(storedData));
    }
    store.subscribe(value => {
        localStorage.setItem(key, JSON.stringify(value));
    });
}

// Store para los productos
export const products = writable([
    { id: 1, name: 'Producto A', price: 10, stock: 50 },
    { id: 2, name: 'Producto B', price: 15, stock: 30 },
]);

// Cargar productos desde localStorage
loadFromLocalStorage(products, 'products');

// Store para los pedidos
export const orders = writable([]);
loadFromLocalStorage(orders, 'orders');

// Store para el historial de ventas
export const salesHistory = writable([]);
loadFromLocalStorage(salesHistory, 'salesHistory');
