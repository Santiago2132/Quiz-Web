import Producto from "../types/Producto.js";

export default class ProductosView {
    public onDeleteProduct: (id: number) => Promise<void> = async () => {};
    public onUpdateProduct: (updatedProducto: Producto) => Promise<void> = async () => {};
    public onCreatedProduct: (createdProducto: Producto) => Promise<void> = async () => {};

    constructor() {
        this.init();
        this.createErrorModal(); // Creamos el modal de error al inicializar la vista
        
    }

    public init(): void {
        console.log("Vista inicializada");
        this.addEventListeners(); // Llama a la función para añadir eventos
        this.addPaginationEvents(); // Añado los eventos del paginador del producto
    }

    private addEventListeners(): void {
        const deleteLink = document.getElementById("del") as HTMLAnchorElement;
        const updateLink = document.getElementById("update") as HTMLAnchorElement;
        const createLink = document.getElementById("create") as HTMLAnchorElement;
    
        if (deleteLink) {
            deleteLink.addEventListener("click", () => {
                const id = parseInt((document.getElementById("id") as HTMLInputElement).value, 10);
                this.handleDelete(id); // Llama a handleDelete aquí
            });
        }
        
        if (updateLink) {
            updateLink.addEventListener("click", () => {
                const id = parseInt((document.getElementById("id") as HTMLInputElement).value, 10);
                this.handleUpdate(id); // Llama al método de actualización con el ID
            });
        }
    
        if (createLink) {
            createLink.addEventListener("click", () => {
                const producto= this.handleCreate1()
                this.handleCreate(producto); // Llama al método de actualización con el ID
            });
        }
        
        
        
    }
    
    public handleDeleteButton(id: number): void {
        console.log("Eliminar producto con ID:", id);
        this.onDeleteProduct(id); // Llama al método de eliminación del controlador
    }

    public handleUpdateButton(updatedProducto: Producto): void {
        this.onUpdateProduct(updatedProducto);
    }

    public handleCreateButton(creratedProducto: Producto): void {
        this.onCreatedProduct(creratedProducto);
    }

    public renderProductos(productos: Producto[]): void {
        productos.forEach((producto) => this.renderProducto(producto));
    }

    public renderProducto(producto: Producto): void {
        const form = document.getElementById("prods") as HTMLFormElement;

        (form.querySelector("#id") as HTMLInputElement).value = producto.id.toString();
        (form.querySelector("#title") as HTMLInputElement).value = producto.title;
        (form.querySelector("#description") as HTMLTextAreaElement).value = producto.description;
        (form.querySelector("#price") as HTMLInputElement).value = producto.price.toString();
        (form.querySelector("#amount") as HTMLInputElement).value = producto.amount;
        (form.querySelector("#discountper") as HTMLInputElement).value = producto.discountPer.toString();
        (form.querySelector("#discountuni") as HTMLInputElement).value = producto.discountUni;
        (form.querySelector("#discount") as HTMLSelectElement).value = producto.discount ? "true" : "false";
    }

    public updatePaginator(isFirst: boolean, isLast: boolean): void {
        const prevButton = document.getElementById("prev") as HTMLButtonElement;
        const nextButton = document.getElementById("next") as HTMLButtonElement;

        prevButton.disabled = isFirst;
        nextButton.disabled = isLast;
        if (isFirst) {
            this.showErrorModal("Error: No puedes retroceder más.");
        } else if (isLast) {
            this.showErrorModal("Error: No puedes avanzar más.");
        }
    }

    private createErrorModal(): void {
        const modal = document.createElement('div');
        modal.id = "errorModal";
        modal.style.display = "none"; // Oculto por defecto
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.backgroundColor = "#fff";
        modal.style.padding = "20px";
        modal.style.border = "1px solid #000";
        modal.style.zIndex = "1000";
        modal.innerHTML = `
            <div>
                <p id="errorMessage"></p>
                <button id="closeModal">Cerrar</button>
            </div>
        `;
        document.body.appendChild(modal);

        const closeModalButton = modal.querySelector("#closeModal") as HTMLButtonElement;
        closeModalButton.addEventListener("click", () => {
            this.hideErrorModal();
        });
    }

    private showErrorModal(message: string): void {
        const modal = document.getElementById("errorModal") as HTMLDivElement;
        const errorMessage = modal.querySelector("#errorMessage") as HTMLParagraphElement;
        errorMessage.textContent = message;
        modal.style.display = "block"; // Muestra el modal
    }

    private hideErrorModal(): void {
        const modal = document.getElementById("errorModal") as HTMLDivElement;
        modal.style.display = "none"; // Oculta el modal
    }

    private addPaginationEvents(): void {
        const prevButton = document.getElementById("prev") as HTMLButtonElement;
        const nextButton = document.getElementById("next") as HTMLButtonElement;

        if (prevButton && nextButton) {
            prevButton.addEventListener("click", () => {
                // Notificar al controlador que se ha pulsado el botón "prev"
                // Implementar la lógica correspondiente en el controlador
            });
            nextButton.addEventListener("click", () => {
                // Notificar al controlador que se ha pulsado el botón "next"
                // Implementar la lógica correspondiente en el controlador
            });
        }
    }

        // Cambiar en ProductosView
    private handleCreate(producto: Producto): void {
        console.log("Producto creado:", producto);
        const saveButton = document.getElementById("save") as HTMLButtonElement;
        saveButton.classList.remove("visually-hidden");
        saveButton.onclick = () => {
            const newProduct = this.handleCreate1(); // Obtener los datos del nuevo producto
            if (newProduct) {
                this.onCreatedProduct(newProduct); // Llama al método de creación
            }
        };   
    }

    // Cambiar en ProductosView
    private handleUpdate(id: number): void {
        console.log(`Actualizando producto con ID: ${id}`);
        
        const saveButton = document.getElementById("save") as HTMLButtonElement;
        saveButton.classList.remove("visually-hidden");
        saveButton.onclick = () => {
            this.handleSave(); // Llama a handleSave para guardar los cambios
        };        
    }

        

    // Función para manejar el enlace "delete"
    private handleDelete(id: number): void {
        const form = document.getElementById("prods") as HTMLFormElement;

        // Eliminar el contenido de los campos
        (form.querySelector("#id") as HTMLInputElement).value = "";
        (form.querySelector("#title") as HTMLInputElement).value = "";
        (form.querySelector("#description") as HTMLTextAreaElement).value = "";
        (form.querySelector("#price") as HTMLInputElement).value = "";
        (form.querySelector("#amount") as HTMLInputElement).value = "";
        (form.querySelector("#discountper") as HTMLInputElement).value = "";
        (form.querySelector("#discountuni") as HTMLInputElement).value = "";
        (form.querySelector("#discount") as HTMLSelectElement).value = "false";

        console.log(`Producto con ID: ${id} eliminado.`);
    }

    public handleSave():void {
        // Obtén los valores del formulario
        const form = document.getElementById("prods") as HTMLFormElement;
        
        // Asegúrate de que el formulario tiene los campos correctos
        const idField = form.querySelector("#id") as HTMLInputElement;
        const titleField = form.querySelector("#title") as HTMLInputElement;
        const descriptionField = form.querySelector("#description") as HTMLTextAreaElement;
        const priceField = form.querySelector("#price") as HTMLInputElement;
        const amountField = form.querySelector("#amount") as HTMLInputElement;
        const discountPerField = form.querySelector("#discountper") as HTMLInputElement;
        const discountUniField = form.querySelector("#discountuni") as HTMLInputElement;
        const discountField = form.querySelector("#discount") as HTMLSelectElement;
        const favoriteField = form.querySelector("#favorite") as HTMLSelectElement; // Campo opcional para "favorite"
        const imgField = form.querySelector("#img") as HTMLInputElement; // Campo opcional para "img"
        
        // Convierte los valores del formulario en un objeto Producto
        const updatedProducto: Producto = {
            id: parseInt(idField.value, 10),
            title: titleField.value,
            description: descriptionField.value,
            price: parseFloat(priceField.value),
            amount: amountField.value,
            discountPer: parseFloat(discountPerField.value),
            discountUni: discountUniField.value,
            discount: discountField.value === "true",
            favorite: favoriteField ? favoriteField.value === "true" : false,
            img: imgField ? imgField.value : ""
        };
        
        // Verifica si el ID es válido y si hay datos para guardar
        if (!isNaN(updatedProducto.id) && updatedProducto.title.trim() !== "") {
            console.log("Producto capturado:", updatedProducto);
            this.onUpdateProduct(updatedProducto); // Llama a la función del controlador
        } else {
            this.showErrorModal("Error: El ID o el título no son válidos.");
        }
    }

    public handleCreate1():Producto {
        // Obtén los valores del formulario
        const form = document.getElementById("prods") as HTMLFormElement;
        
        // Asegúrate de que el formulario tiene los campos correctos
        const idField = form.querySelector("#id") as HTMLInputElement;
        const titleField = form.querySelector("#title") as HTMLInputElement;
        const descriptionField = form.querySelector("#description") as HTMLTextAreaElement;
        const priceField = form.querySelector("#price") as HTMLInputElement;
        const amountField = form.querySelector("#amount") as HTMLInputElement;
        const discountPerField = form.querySelector("#discountper") as HTMLInputElement;
        const discountUniField = form.querySelector("#discountuni") as HTMLInputElement;
        const discountField = form.querySelector("#discount") as HTMLSelectElement;
        const favoriteField = form.querySelector("#favorite") as HTMLSelectElement; // Campo opcional para "favorite"
        const imgField = form.querySelector("#img") as HTMLInputElement; // Campo opcional para "img"
        
        // Convierte los valores del formulario en un objeto Producto
        const updatedProducto: Producto = {
            id: parseInt(idField.value, 10),
            title: titleField.value,
            description: descriptionField.value,
            price: parseFloat(priceField.value),
            amount: amountField.value,
            discountPer: parseFloat(discountPerField.value),
            discountUni: discountUniField.value,
            discount: discountField.value === "true",
            favorite: favoriteField ? favoriteField.value === "true" : false,
            img: imgField ? imgField.value : ""
        };

        console.log("Producto capturado:", updatedProducto);
        this.onCreatedProduct(updatedProducto); // Llama a la función del controlador
        return updatedProducto
        
        
    }
    
    
    
}