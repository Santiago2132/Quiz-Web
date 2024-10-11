export default class ProductosModel {
    productos = [];
    constructor() { }
    getProductsFetch = async () => {
        const response = await fetch('./database/products.json');
        if (response.status !== 200) {
            return [];
        }
        const data = await response.json();
        return data;
    };
    getProductos() {
        return this.productos;
    }
    async init() {
        this.productos = await this.getProductsFetch();
    }
    async deleteProducto(id) {
        this.productos = this.productos.filter(producto => producto.id !== id);
    }
    async updateProducto(updatedProducto) {
        console.log(updatedProducto);
        const index = this.productos.findIndex(producto => producto.id === updatedProducto.id);
        if (index !== -1) {
            this.productos[index] = updatedProducto; // Actualiza el producto en la lista
            console.log("Producto actualizado en el modelo:", this.productos[index]);
        }
        else {
            console.error("No se encontró el producto para actualizar.");
        }
    }
    async createProducto(newProduct) {
        console.log(newProduct);
        this.productos.push(newProduct);
    }
}
