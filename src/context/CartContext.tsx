import React, {createContext, useState, useContext, ReactNode} from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;

}

interface CartContextType {
    items: CartItem[];
    totalPrice: number;
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    clearCart:() => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [items, setItems] = useState<CartItem[]>([])

    const addItem = (item: CartItem) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);
            if (existingItem) {
                return prevItems.map((i) => {
                    return i.id === item.id ? {...i, quantity: i.quantity + item.quantity} : i
                })
            } else {
                return [...prevItems, item]
            }
        })
    }

    const removeItem = (id: number) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id))
    }

    const clearCart = () => {
        setItems([])
    }

    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <CartContext.Provider value={{items, totalPrice, addItem, removeItem, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}