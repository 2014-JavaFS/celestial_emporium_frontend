import { useEffect, useState } from "react";
import { ceServer } from "../../common/ce-server";
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

  useEffect(() => {
    fetch("http://localhost:8080/cart-items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCartItems(data);
        console.log(data);
      });
  }, []);

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
