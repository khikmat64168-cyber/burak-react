import axios from 'axios';
import { serverApi } from '../../lib/config';
import { Order, OrderInquiry, OrderItemInput } from '../../lib/types/order';
import { CartItem } from '../../lib/types/search';
import { OrderStatus } from '../../lib/enums/order.enum';

class OrderService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async createOrder(input: CartItem[]): Promise<Order> {
    try {
      const orderItem: OrderItemInput[] = input.map((cartItem: CartItem) => {
        return {
          itemQuantity: cartItem.quantity,
          itemPrice: cartItem.price,
          productId: cartItem._id,
        };
      });

      const url = this.path + '/order/create';
      const result = await axios.post(url, orderItem, {
        withCredentials: true,
      });
      console.log('createOrder :', result);
      return result.data as Order;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async getMyOrders(input: OrderInquiry): Promise<Order[]> {
    try {
      //axios withCredentials = true
      axios.defaults.withCredentials = true;
      const url = `${this.path}/ order / all`;
      const query = `?page =${input.page}&limit=${input.limit}&orderStatus=${OrderStatus}`;
      const result = await axios.get(url + query, { withCredentials: true });

      console.log('getMuOrders:', result);

      return result.data;
    } catch (err) {
      console.log(' Error, getMyOrders:', err);
      throw err;
    }
  }

  public async updateOrder(input: OrderUpdateInput): Promise<Order> {
    try {
      const url = `${this.path}  + '/order/update'`;
      const result = await axios.post(url, input, { withCredentials: true });
    } catch (err) {
      console.log(' Error, getMyOrders:', err);
      throw err;
    }
  }
}

export default OrderService;
