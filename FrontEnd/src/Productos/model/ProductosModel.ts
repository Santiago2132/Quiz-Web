import Producto from "../types/Producto.js";

export default class ProductosModel {
    private productos: Producto[] = [];
  
    constructor() {}

    public getProductsFetch = async (): Promise<Producto[]> => {
        const response = await fetch('./database/products.json');
        if (response.status !== 200) {
            return [];
        }

        const data = await response.json();
        return data;
    }

    public getProductos(): Producto[] {
        return this.productos;
    }

    public async init(){
        this.productos = await this.getProductsFetch();
    }

    public async deleteProducto(id: number): Promise<void> {
        this.productos = this.productos.filter(producto => producto.id !== id);
    }

    public async updateProducto(updatedProducto: Producto): Promise<void> {
        console.log(updatedProducto)
        const index = this.productos.findIndex(producto => producto.id === updatedProducto.id);
        if (index !== -1) {
            this.productos[index] = updatedProducto; // Actualiza el producto en la lista
            console.log("Producto actualizado en el modelo:", this.productos[index]);
        } else {
            console.error("No se encontró el producto para actualizar.");
        }
    }


    public async createProducto(newProduct: Producto): Promise<void> {
        console.log(newProduct)
        this.productos.push(newProduct)
    }
    
    
}