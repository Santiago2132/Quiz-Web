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
        this.productos = await this.getProductsServer();
    }
    async deleteProducto(id) {
        this.productos = this.productos.filter(producto => producto.id !== id);
        await this.deleteProductsServer(id);
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
        await this.updateProductsServer(updatedProducto);
    }
    async createProducto(newProduct) {
        console.log(newProduct);
        this.productos.push(newProduct);
        await this.addProductsServer(newProduct);
    }
    getProductsServer = async () => {
        const response = await fetch('http://localhost:1802/api/v1.0/productos');
        if (response.status !== 200) {
            return [];
        }
        const data = await response.json();
        console.log(data);
        return data;
    };
    addProductsServer = async (producto) => {
        const response = await fetch('http://localhost:1802/api/v1.0/productos/agregar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
        });
        if (response.status !== 200) {
            return null;
        }
        const data = await response.json();
        console.log(data);
        return data;
    };
    deleteProductsServer = async (idProducto) => {
        const response = await fetch('http://localhost:1802/api/v1.0/productos/eliminar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(idProducto),
        });
        if (response.status !== 200) {
            return null;
        }
        const data = await response.json();
        console.log(data);
        return data;
    };
    updateProductsServer = async (producto) => {
        const response = await fetch('http://localhost:1802/api/v1.0/productos/actualizar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
        });
        if (response.status !== 200) {
            return null;
        }
        const data = await response.json();
        console.log(data);
        return data;
    };
}
