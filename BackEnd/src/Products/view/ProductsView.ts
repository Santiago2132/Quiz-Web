import { Router } from 'express'
import ProductController from '../controller/ProductsController'

export default class ProductsView {
  router: Router

  constructor(private readonly productController: ProductController) {
    this.router = Router()
    this.routes()
  }

  public routes = (): void => {
    this.router.get(
      '/',
      this.productController.obtenerProductos.bind(this.productController)
    )

    this.router.post(
      '/agregar',
      this.productController.agregarProducto.bind(this.productController)
    )

    this.router.delete(
      '/eliminar',
      this.productController.eliminarProducto.bind(this.productController)
    );

    this.router.put(
      '/actualizar',
      this.productController.actualizarProducto.bind(this.productController)
    );



    this.router.get(
      '/producto/imagen/:id',
      this.productController.obtenerImagen.bind(this.productController)
    )
  }
}
