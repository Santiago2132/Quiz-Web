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
        await this.init();
    }
    async updateProducto(updatedProducto) {
        console.log(updatedProducto);
        const index = this.productos.findIndex(producto => producto.id === updatedProducto.id);
        if (index !== -1) {
            const respuesta = await this.updateProductsServer(updatedProducto);
            this.productos[index] = updatedProducto; // Actualiza el producto en la lista
            console.log("Producto actualizado en el modelo:", this.productos[index]);
            console.log(respuesta);
            await this.init();
        }
        else {
            console.error("No se encontró el producto para actualizar.");
        }
    }
    async createProducto(newProduct) {
        console.log(newProduct + 'PRODUCTO EN MODELO');
        try {
            await this.addProductsServer(newProduct);
            this.productos.push(newProduct); // Agregar a la lista local si la creación es exitosa
            await this.init();
        }
        catch (error) {
            console.error("Error en createProducto:", error);
        }
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
        try {
            const response = await fetch('http://localhost:1802/api/v1.0/productos/nuevo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto),
            });
            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return null;
            }
            const data = await response.json();
            console.log(data);
            return JSON.stringify(data);
        }
        catch (error) {
            console.error("Error en addProductsServer:", error);
            return null;
        }
    };
    deleteProductsServer = async (idProducto) => {
        const response = await fetch('http://localhost:1802/api/v1.0/productos/eliminar', {
            method: 'DELETE',
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
            method: 'PUT',
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
