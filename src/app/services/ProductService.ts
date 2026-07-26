import axios from 'axios';
import { serverApi } from '../../lib/config';
import { Product, ProductInquery } from '../../lib/types/product';
import { Input } from '@mui/material';

class ProductService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  public async getProducts(input: ProductInquery): Promise<Product[]> {
    try {
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;

      if (input.productCollection)
        url += `&productCollection=${input.productCollection}`;

      if (input.search)
        url += `&search=${input.search}`;

      console.log('🔵 STAGE 2: ProductService → Backend ga HTTP so\'rov ketdi:', url);
      const result = await axios.get(url);
      console.log('🟢 STAGE 3: ProductService → Backend javob berdi! result.status:', result.status, '| Kelgan data:', result.data);

      return result.data;
    } catch (err) {
      console.log('Error, getProduct:', err);
      throw err;
    }
  }

  public async getProduct(productId: string): Promise<Product> {
    try {
      const url = `${this.path}/product/${productId}`;
      const result = await axios.get(url, { withCredentials: true });
      console.log('getProduct :', result);
      return result.data;
    } catch (err) {
      console.log('Error, getProduct:', err);
      throw err;
    }
  }
}

export default ProductService;
