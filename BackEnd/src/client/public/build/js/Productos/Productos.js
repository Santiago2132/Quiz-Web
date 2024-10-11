import ProductosController from "./controller/ProductosController.js";
import ProductosModel from "./model/ProductosModel.js";
import ProductosView from "./view/ProductosView.js";
export default class Productos {
    model;
    view;
    controller;
    constructor() {
        this.model = new ProductosModel();
        this.view = new ProductosView();
        this.controller = new ProductosController(this.model, this.view);
    }
    async init() {
        await this.controller.init();
    }
}
