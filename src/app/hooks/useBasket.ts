import { useState } from 'react';
import { CartItem } from '../../lib/types/search';

const useBasket = () => {
  const cartJson: string | null = localStorage.getItem('cartData');
  const currentCart = cartJson ? JSON.parse(cartJson) : [];

  const [cartItem, setCartItem] = useState<CartItem[]>(currentCart);

  const onAdd /**define */ = (input: CartItem) => {
    const exist: any = cartItem.find(
      (item: CartItem) => item._id === input._id,
    );
    if (exist) {
      const cartUpdate = cartItem.map((item: CartItem) => {
        return item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item;
      });

      setCartItem(cartUpdate);
      localStorage.setItem('cartData', JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = [...cartItem, { ...input }];

      setCartItem(cartUpdate);
      localStorage.setItem('cartData', JSON.stringify(cartUpdate));
    }
  };

  const onRemove = (input: CartItem) => {
    const exist: any = cartItem.find(
      (item: CartItem) => item._id === input._id,
    );

    if (exist.quantity === 1) {
      const cartUpdate = cartItem.filter(
        (input: CartItem) => input._id !== input._id,
      );
      setCartItem(cartUpdate);
      localStorage.setItem('cartData', JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = cartItem.map((item: CartItem) =>
        item._id === item._id
          ? { ...exist, quantity: exist.quantity - 1 }
          : item,
      );

      setCartItem(cartUpdate);
      localStorage.setItem('cartData', JSON.stringify(cartUpdate));
    }
  };

  const onDelete = (input: CartItem) => {
    const cartUpdate = cartItem.filter(
      (item: CartItem) => item._id !== input._id,
    );

    setCartItem(cartUpdate);
    localStorage.setItem('cartData', JSON.stringify(cartUpdate));
  };

  const onDeleteAll = () => {
    setCartItem([]);
    localStorage.removeItem('cartItem');
  };

  return {
    cartItem,
    onRemove,
    onAdd,
    onDelete,
    onDeleteAll,
  };
};

export default useBasket;
