export default class ProductosView {
    onDeleteProduct = async () => { };
    onUpdateProduct = async () => { };
    onCreatedProduct = async () => { };
    constructor() {
        this.init();
        this.createErrorModal(); // Creamos el modal de error al inicializar la vista
    }
    init() {
        console.log("Vista inicializada");
        this.addEventListeners(); // Llama a la función para añadir eventos
        this.addPaginationEvents(); // Añado los eventos del paginador del producto
    }
    addEventListeners() {
        const deleteLink = document.getElementById("del");
        const updateLink = document.getElementById("update");
        const createLink = document.getElementById("create");
        if (deleteLink) {
            deleteLink.addEventListener("click", () => {
                const id = parseInt(document.getElementById("id").value, 10);
                this.handleDelete(id); // Llama a handleDelete aquí
            });
        }
        if (updateLink) {
            updateLink.addEventListener("click", () => {
                const id = parseInt(document.getElementById("id").value, 10);
                this.handleUpdate(id); // Llama al método de actualización con el ID
            });
        }
        if (createLink) {
            createLink.addEventListener("click", () => {
                const producto = this.handleCreate1();
                this.handleCreate(producto); // Llama al método de actualización con el ID
            });
        }
    }
    handleDeleteButton(id) {
        console.log("Eliminar producto con ID:", id);
        this.onDeleteProduct(id); // Llama al método de eliminación del controlador
    }
    handleUpdateButton(updatedProducto) {
        this.onUpdateProduct(updatedProducto);
    }
    handleCreateButton(creratedProducto) {
        this.onCreatedProduct(creratedProducto);
    }
    renderProductos(productos) {
        productos.forEach((producto) => this.renderProducto(producto));
    }
    renderProducto(producto) {
        const form = document.getElementById("prods");
        form.querySelector("#id").value = producto.id.toString();
        form.querySelector("#title").value = producto.title;
        form.querySelector("#description").value = producto.description;
        form.querySelector("#price").value = producto.price.toString();
        form.querySelector("#amount").value = producto.amount;
        form.querySelector("#discountper").value = producto.discountPer.toString();
        form.querySelector("#discountuni").value = producto.discountUni;
        form.querySelector("#discount").value = producto.discount ? "true" : "false";
    }
    updatePaginator(isFirst, isLast) {
        const prevButton = document.getElementById("prev");
        const nextButton = document.getElementById("next");
        prevButton.disabled = isFirst;
        nextButton.disabled = isLast;
        if (isFirst) {
            this.showErrorModal("Error: No puedes retroceder más.");
        }
        else if (isLast) {
            this.showErrorModal("Error: No puedes avanzar más.");
        }
    }
    createErrorModal() {
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
        const closeModalButton = modal.querySelector("#closeModal");
        closeModalButton.addEventListener("click", () => {
            this.hideErrorModal();
        });
    }
    showErrorModal(message) {
        const modal = document.getElementById("errorModal");
        const errorMessage = modal.querySelector("#errorMessage");
        errorMessage.textContent = message;
        modal.style.display = "block"; // Muestra el modal
    }
    hideErrorModal() {
        const modal = document.getElementById("errorModal");
        modal.style.display = "none"; // Oculta el modal
    }
    addPaginationEvents() {
        const prevButton = document.getElementById("prev");
        const nextButton = document.getElementById("next");
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
    handleCreate(producto) {
        console.log("Producto creado:", producto);
        const saveButton = document.getElementById("save");
        saveButton.classList.remove("visually-hidden");
        const idProducto = document.getElementById('id');
        idProducto.readOnly = false;
        if (saveButton) {
            saveButton.addEventListener("click", () => {
                this.handleCreate1(); // Llama a handleCreate aquí
            });
        }
        saveButton.onclick = () => {
            const newProduct = this.handleCreate1(); // Obtener los datos del nuevo producto
            if (newProduct) {
                this.onCreatedProduct(newProduct); // Llama al método de creación
            }
        };
    }
    // Cambiar en ProductosView
    handleUpdate(id) {
        console.log(`Actualizando producto con ID: ${id}`);
        const saveButton = document.getElementById("save");
        saveButton.classList.remove("visually-hidden");
        saveButton.onclick = () => {
            this.handleSave(); // Llama a handleSave para guardar los cambios
        };
    }
    // Función para manejar el enlace "delete"
    handleDelete(id) {
        const form = document.getElementById("prods");
        // Eliminar el contenido de los campos
        form.querySelector("#id").value = "";
        form.querySelector("#title").value = "";
        form.querySelector("#description").value = "";
        form.querySelector("#price").value = "";
        form.querySelector("#amount").value = "";
        form.querySelector("#discountper").value = "";
        form.querySelector("#discountuni").value = "";
        form.querySelector("#discount").value = "false";
        console.log(`Producto con ID: ${id} eliminado.`);
    }
    handleSave() {
        // Obtén los valores del formulario
        const form = document.getElementById("prods");
        // Asegúrate de que el formulario tiene los campos correctos
        const idField = form.querySelector("#id");
        const titleField = form.querySelector("#title");
        const descriptionField = form.querySelector("#description");
        const priceField = form.querySelector("#price");
        const amountField = form.querySelector("#amount");
        const discountPerField = form.querySelector("#discountper");
        const discountUniField = form.querySelector("#discountuni");
        const discountField = form.querySelector("#discount");
        const favoriteField = form.querySelector("#favorite"); // Campo opcional para "favorite"
        const imgField = form.querySelector("#img"); // Campo opcional para "img"
        // Convierte los valores del formulario en un objeto Producto
        const updatedProducto = {
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
        }
        else {
            this.showErrorModal("Error: El ID o el título no son válidos.");
        }
    }
    handleCreate1() {
        // Obtén los valores del formulario
        const form = document.getElementById("prods");
        // Asegúrate de que el formulario tiene los campos correctos
        const idField = form.querySelector("#id");
        const titleField = form.querySelector("#title");
        const descriptionField = form.querySelector("#description");
        const priceField = form.querySelector("#price");
        const amountField = form.querySelector("#amount");
        const discountPerField = form.querySelector("#discountper");
        const discountUniField = form.querySelector("#discountuni");
        const discountField = form.querySelector("#discount");
        const favoriteField = form.querySelector("#favorite"); // Campo opcional para "favorite"
        const imgField = form.querySelector("#img"); // Campo opcional para "img"
        // Convierte los valores del formulario en un objeto Producto
        const updatedProducto = {
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
        return updatedProducto;
    }
}
