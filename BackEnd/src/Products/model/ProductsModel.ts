import products_json from '../../database/products.json';
import Environment from '../shared/Environment';
import path from 'path';
import { promises as fs } from 'fs';
import ProductInterface from '../types/ProductInterface';

export default class ProductsModel {

  public fetchProducts = (): ProductInterface[] => {
    const products = (products_json as ProductInterface[]).map((product) => {
      return {
        id: product.id,
        title: product.title,
        amount: product.amount,
        price: product.price,
        description: product.description,
        favorite: product.favorite,
        discount: product.discount,
        discountPer: product.discountPer,
        discountUni: product.discountUni,
        img: `${Environment.getDomainProducts()}/api/v1.0/productos/product/imagen/${product.id}.jpg`
      };
    });
    console.log(products);
    return products;
  }

  public async addProduct(product: ProductInterface): Promise<string> {
    try {
      // Leer el archivo JSON existente
      const products: ProductInterface[] = JSON.parse(await fs.readFile(path.join(__dirname, '../../database/products.json'), 'utf-8'));
      
      // Añadir el nuevo producto
      products.push(product);
      
      // Escribir el archivo JSON actualizado
      await fs.writeFile(path.join(__dirname, '../../database/products.json'), JSON.stringify(products, null, 2), 'utf-8');
      
      console.log('Producto añadido:', product);
      return 'Producto añadido exitosamente';
    } catch (error) {
      console.error('Error al escribir en el archivo JSON:', error);
      return 'Error al añadir el producto';
    }
  }

  public async updateProduct(updatedProduct: ProductInterface): Promise<string> {
    try {
      // Leer el archivo JSON existente
      const products: ProductInterface[] = JSON.parse(await fs.readFile(path.join(__dirname, '../../database/products.json'), 'utf-8'));

      // Buscar el índice del producto a actualizar
      const productIndex = products.findIndex(product => product.id === updatedProduct.id);
      if (productIndex === -1) {
        return 'Producto no encontrado';
      }

      // Actualizar el producto
      products[productIndex] = updatedProduct;

      // Escribir el archivo JSON actualizado
      await fs.writeFile(path.join(__dirname, '../../database/products.json'), JSON.stringify(products, null, 2), 'utf-8');

      console.log('Producto actualizado:', updatedProduct);
      return 'Producto actualizado exitosamente';
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      return 'Error al actualizar el producto';
    }
  }
//a
  public async deleteProduct(idProducto: number): Promise<string> {
    try {
      // Leer el archivo JSON existente
      const products: ProductInterface[] = JSON.parse(await fs.readFile(path.join(__dirname, '../../database/products.json'), 'utf-8'));

      // Filtrar el producto a eliminar
      const updatedProducts = products.filter(product => product.id !== idProducto);
      if (updatedProducts.length === products.length) {
        return 'Producto no encontrado';
      }

      // Escribir el archivo JSON actualizado
      await fs.writeFile(path.join(__dirname, '../../database/products.json'), JSON.stringify(updatedProducts, null, 2), 'utf-8');

      console.log('Producto eliminado:', idProducto);
      return 'Producto eliminado exitosamente';
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      return 'Error al eliminar el producto';
    }
  }

  public getProductImage = async (file: string): Promise<string> => {
    const absolutePath = path.join(__dirname, `../../database/assets/`);
    const defaultImage = ''; // Define tu imagen por defecto aquí
    try {
      await fs.access(absolutePath + file, fs.constants.F_OK);
      const stats = await fs.stat(absolutePath + file);
      console.log(stats);
      if (stats.isFile()) {
        return absolutePath + file;
      }
      return absolutePath + defaultImage;
    } catch (err) {
      return absolutePath + defaultImage;
    }
  }
}
