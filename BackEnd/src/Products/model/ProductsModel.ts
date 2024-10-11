import products_json from '../../database/products.json'
import Environment from '../shared/Environment'
import path from 'path'
import { promises as fs } from 'fs'
import ProductInterface from '../types/ProductInterface'

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
    console.log(products)
    return products;
  }

  public async addProduct(product: ProductInterface): Promise<string> {
    try {
      //añadir en el json
      console.log(product)
      return ''
    } catch (error) {
        console.error('Error al escribir en el archivo JSON:', error);
        return 'Error al añadir el producto';
    }
  }


  public async updateProduct(updatedProduct: ProductInterface): Promise<string> {
    try {
       //actualizar el json
       console.log(updatedProduct)

         return ''
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        return 'Error al actualizar el producto';
    }
  }
    public async deleteProduct(idProducto: number): Promise<string> {
      try {
         //eliminar el producto en el json
         console.log(idProducto)
           return ''
      } catch (error) {
          console.error('Error al eliminar el producto:', error);
          return 'Error al eliminar el producto';
      }
  }

  public getProductImage = async (file: string): Promise<string> => {
    const absolutePath = path.join(__dirname, `../../database/assets/`)
    const defaultImage = ''
    try {
      await fs.access(absolutePath + file, fs.constants.F_OK)
      const stats = await fs.stat(absolutePath + file)
      console.log(stats)
      if (stats.isFile()) {
        return absolutePath + file
      }
      return absolutePath + defaultImage
    } catch (err) {
      return absolutePath + defaultImage
    }
  }
}
