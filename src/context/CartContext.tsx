import React, { createContext, useState, useContext, ReactNode } from "react";

interface CartItem {
  id: number;
  quantity: number;
  price: number;
  item: {
    name: string;
  };
}

interface CartContextType {
  items: CartItem[];
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  addToCart: (items: CartItem | CartItem[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) => {
          return i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i;
        });
      } else {
        return [...prevItems, item];
      }
    });
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const addToCart = (newItems: CartItem | CartItem[]) => {
    setItems((prevItems) => {
    if (Array.isArray(newItems)) {
    const updatedItems = [...prevItems];
          newItems.forEach((item) => {
    const existingItem = updatedItems.find((i) => i.id === item.id);
    if (existingItem) {
              existingItem.quantity = item.quantity;
            } else {
              updatedItems.push(item);
            }
          });
    return updatedItems;
        } else {
    const existingItem = prevItems.find((item) => item.id === newItems.id);
    if (existingItem) {
    return prevItems.map((item) =>
              item.id === newItems.id ? { ...item, quantity: item.quantity + newItems.quantity } : item
            );
          }
    return [...prevItems, newItems];
        }
      });
    };

  return (
    <CartContext.Provider
      value={{ items, totalPrice, addItem, removeItem, clearCart, addToCart }}
    >
      {children}
    </CartContext.Provider>
  );


};

export const useCart = () => {

    const context = useContext(CartContext);
    if (context === undefined) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
  };


