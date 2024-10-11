export default class ProductosController {
    model;
    view;
    currentIndex = 0;
    // Cambiar en ProductosController
    constructor(model, view) {
        this.model = model;
        this.view = view;
        // Inicializamos los eventos de la vista
        this.view.onDeleteProduct = this.handleDelete.bind(this);
        this.view.onUpdateProduct = this.handleUpdate.bind(this);
        this.view.onCreatedProduct = this.handleCreate.bind(this); // Agrega este método
    }
    async init() {
        await this.model.init();
        await this.view.init();
        this.loadProductos();
        this.addPaginationEvents();
    }
    loadProductos() {
        const productos = this.model.getProductos();
        if (productos.length > 0) {
            this.view.renderProductos(productos); // Ahora este método existe
            this.currentIndex = 0;
            this.loadProducto();
        }
    }
    loadProducto() {
        const productos = this.model.getProductos();
        if (productos.length > 0) {
            const productoActual = productos[this.currentIndex];
            if (productoActual) {
                this.view.renderProducto(productoActual);
                this.view.updatePaginator(this.currentIndex === 0, this.currentIndex === productos.length - 1);
            }
        }
    }
    addPaginationEvents() {
        const prevButton = document.getElementById("prev");
        const nextButton = document.getElementById("next");
        prevButton.addEventListener("click", () => {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            }
            else {
                this.currentIndex = this.model.getProductos().length - 1;
            }
            this.loadProducto();
        });
        nextButton.addEventListener("click", () => {
            const productos = this.model.getProductos();
            if (this.currentIndex < productos.length - 1) {
                this.currentIndex++;
            }
            else {
                this.currentIndex = 0;
            }
            this.loadProducto();
        });
    }
    async handleDelete(id) {
        console.log(`Recibido ID para eliminar: ${id}`);
        await this.model.deleteProducto(id); // Elimina el producto del modelo
        this.loadProductos(); // Recarga los productos después de eliminar
    }
    async handleUpdate(updatedProducto) {
        console.log("Actualizando producto en el controlador:", updatedProducto); // Asegúrate de que los datos lleguen aquí correctamente
        await this.model.updateProducto(updatedProducto); // Actualiza el modelo con los nuevos datos
        this.loadProductos(); // Recarga los productos para reflejar los cambios en la vista
    }
    // Agregar el método handleCreate en el controlador
    async handleCreate(newProduct) {
        console.log("Creando producto en el controlador:", newProduct); // Asegúrate de que los datos lleguen aquí correctamente
        await this.model.createProducto(newProduct); // Crea el producto en el modelo
        this.loadProductos(); // Recarga los productos para reflejar los cambios en la vista
    }
}
