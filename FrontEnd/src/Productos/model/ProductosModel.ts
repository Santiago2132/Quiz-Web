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
        this.productos = await this.getProductsServer();
    }

    public async deleteProducto(id: number): Promise<void> {
        this.productos = this.productos.filter(producto => producto.id !== id);
        await this.deleteProductsServer(id)
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
        await this.updateProductsServer(updatedProducto)
    }


    public async createProducto(newProduct: Producto): Promise<void> {
        console.log(newProduct)
        this.productos.push(newProduct)
        await this.addProductsServer(newProduct)
    }

    public getProductsServer = async (): Promise<Producto[]> => {
        const response = await fetch('http://localhost:1802/api/v1.0/productos');
        if (response.status !== 200) {
            return [];
        }
        const data = await response.json();
        console.log(data); 
    
        return data;
      }

      
    public addProductsServer = async (producto: Producto): Promise<string | null> => {
        const response = await fetch('http://localhost:1802/api/v1.0/productos/agregar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
          })
        if (response.status !== 200) {
            return null;
        }
        const data = await response.json();
        console.log(data); 
    
        return data;
    }

    public deleteProductsServer = async (idProducto: number): Promise<string | null> => {
        const response = await fetch('http://localhost:1802/api/v1.0/productos/eliminar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(idProducto),
          })
        if (response.status !== 200) {
            return null;
        }
        const data = await response.json();
        console.log(data); 
    
        return data;
    }

    
    public updateProductsServer =async (producto: Producto): Promise<string | null> => {
        const response = await fetch('http://localhost:1802/api/v1.0/productos/actualizar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
          })
        if (response.status !== 200) {
            return null;
        }
        const data = await response.json();
        console.log(data); 
    
        return data;
    }

    
    
}