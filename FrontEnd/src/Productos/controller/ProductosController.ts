import ProductosModel from "../model/ProductosModel.js";
import Producto from "../types/Producto.js";
import ProductosView from "../view/ProductosView.js";

export default class ProductosController {
    private model: ProductosModel;
    private view: ProductosView;
    private currentIndex: number = 0;

    constructor(model: ProductosModel, view: ProductosView) {
        this.model = model;
        this.view = view;
    
        // Inicializamos los eventos de la vista
        this.view.onDeleteProduct = this.handleDelete.bind(this);
        this.view.onUpdateProduct = this.handleUpdate.bind(this);
    }

    public async init(): Promise<void> {
        await this.model.init();
        this.view.init();
        this.loadProductos();
        this.addPaginationEvents(); 
    }

    private loadProductos(): void {
      const productos = this.model.getProductos();
  
      if (productos.length > 0) {
          this.view.renderProductos(productos); // Ahora este método existe
          this.currentIndex = 0;
          this.loadProducto(); 
      }
  }

    private loadProducto(): void {
        const productos = this.model.getProductos();

        if (productos.length > 0) {
            const productoActual = productos[this.currentIndex];

            if (productoActual) {
                this.view.renderProducto(productoActual);
                this.view.updatePaginator(
                    this.currentIndex === 0, 
                    this.currentIndex === productos.length - 1
                );
            }
        }
    }

    private addPaginationEvents(): void {
        const prevButton = document.getElementById("prev") as HTMLButtonElement;
        const nextButton = document.getElementById("next") as HTMLButtonElement;

        prevButton.addEventListener("click", () => {
            this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.model.getProductos().length - 1;
            this.loadProducto();
        });

        nextButton.addEventListener("click", () => {
            const productos = this.model.getProductos();
            this.currentIndex = (this.currentIndex < productos.length - 1) ? this.currentIndex + 1 : 0;
            this.loadProducto();
        });
    }

    public async handleDelete(id: number): Promise<void> {
        console.log(`Recibido ID para eliminar: ${id}`);
        await this.model.deleteProducto(id); // Elimina el producto del modelo
        this.loadProductos(); // Recarga los productos después de eliminar
    }

    public async handleUpdate(updatedProducto: Producto): Promise<void> {
        console.log("Actualizando producto en el controlador:", updatedProducto); // Asegúrate de que los datos lleguen aquí correctamente
        
        await this.model.updateProducto(updatedProducto); // Actualiza el modelo con los nuevos datos
        
        this.loadProductos(); // Recarga los productos para reflejar los cambios en la vista
    }   
    
    public async handleCreate(updatedProducto: Producto): Promise<void> {
        console.log("creando producto en el controlador:", updatedProducto); // Asegúrate de que los datos lleguen aquí correctamente
        
        await this.model.createProducto(updatedProducto); // Actualiza el modelo con los nuevos datos
        
        this.loadProductos(); // Recarga los productos para reflejar los cambios en la vista
    }    
    
    
    
}