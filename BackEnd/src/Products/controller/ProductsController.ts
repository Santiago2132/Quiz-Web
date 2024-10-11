import { Request, Response } from 'express';
import ProductsModel from '../model/ProductsModel';

export default class ProductController {
  constructor(private readonly productModel: ProductsModel) {}

  public obtenerProductos = async (_req: Request, res: Response) => {
    try {
      const products = await this.productModel.fetchProducts();
      if (products.length === 0) {
        res.status(200).json({ message: 'No products found' });
        return;
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error });
    }
  };

  public agregarProducto = async (req: Request, res: Response) => {
    try {
      const newProduct = await this.productModel.addProduct(req.body);
      res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error adding product', error });
    }
  };

  public eliminarProducto = async (req: Request, res: Response) => {
    const id = req.params['id'];
    try {
        if(id){
            const result = await this.productModel.deleteProduct(Number(id));
            if (result === 'Product not found') {
                res.status(404).json({ message: result });
              } else {
                res.status(200).json({ message: 'Product deleted successfully' });
              }
        }
     
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error });
    }
  };

  public actualizarProducto = async (req: Request, res: Response) => {

    try {
      const updatedProduct = await this.productModel.updateProduct(req.body);
      if (!updatedProduct) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error });
    }
  };

  public obtenerImagen = async (req: Request, res: Response) => {
    const id = req.params['id']
    
    res.status(200).sendFile(
      await this.productModel.getProductImage(id ?? '')
    )
  }

}
