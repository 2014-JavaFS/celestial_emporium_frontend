import { useEffect, useState } from "react";
import CartItem from "../cartitem/CartItem";

interface cartInterface {
  id: number;
  quantity: number;
  price: number;
  item: {
    name: string;
  };
}

export default function AllCartItems() {
  const [cartItems, setCartItems] = useState([]);
  const userId = 1; // Replace with the actual user ID from your authentication context or props

  useEffect(() => {
    fetch(`http://localhost:8080/cart-items/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching cart items:", err);
      });
  }, [userId]);

  return (
    <>
      {cartItems.map((cartItem: cartInterface) => {
        return (
          <CartItem
            key={cartItem.id}
            name={cartItem.item.name}
            price={cartItem.price}
            quantity={cartItem.quantity}
          />
        );
      })}
    </>
  );
}
