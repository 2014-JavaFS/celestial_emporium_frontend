import { useEffect, useState } from "react";
import CartItem from "../cartitem/CartItem";
import parseJwt from "../../util/parseJwt";
import { useCart } from "../../context/CartContext"

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
  const [userId, setUserId] = useState(0);
  const { items, addToCart } = useCart();
  // const userId = 1; // Replace with the actual user ID from your authentication context or props

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if(token) {
        const decodedToken = parseJwt(token)
        if (decodedToken) {
            const decodedToken = parseJwt(token);
            if (decodedToken) {
                decodedToken.userId;
                setUserId(decodedToken.userId)
                console.log(decodedToken)
            }
        }

    }
}, [])

  useEffect(() => {
    fetch(`http://localhost:8080/cart-items/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
       // setCartItems(data);
       addToCart(data); 

        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching cart items:", err);
      });
  }, [userId]);

  return (
    <>
      {items.map((cartItem: cartInterface) => {
        return (
          <CartItem
            id={cartItem.id}
            name={cartItem.item.name}
            price={cartItem.price}
            quantity={cartItem.quantity}
          />
        );
      })}
    </>
  );
}
