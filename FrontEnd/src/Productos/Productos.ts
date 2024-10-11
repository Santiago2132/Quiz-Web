import ProductosController from "./controller/ProductosController.js";
import ProductosModel from "./model/ProductosModel.js";
import ProductosView from "./view/ProductosView.js";

export default class Productos {
  private model: ProductosModel;
  private view: ProductosView;
  private controller: ProductosController;

  constructor() {
    this.model = new ProductosModel();
    this.view = new ProductosView();
    this.controller = new ProductosController(this.model, this.view);
  }

  public async init(): Promise<void> {
    await this.controller.init();
  }
}
