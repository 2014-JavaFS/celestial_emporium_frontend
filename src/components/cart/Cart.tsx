import { useEffect, useState } from "react";
import CartItem from "../cartitem/CartItem";
import parseJwt from "../../util/parseJwt";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decodedToken = parseJwt(token);
      if (decodedToken) {
        const decodedToken = parseJwt(token);
        if (decodedToken) {
          decodedToken.userId;
          setUserId(decodedToken.userId);
          console.log(decodedToken);
        }
      }
    }
  }, []);

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

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      {items.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        items.map((cartItem: cartInterface) => (
          <CartItem
            key={cartItem.id}
            id={cartItem.id}
            name={cartItem.item.name}
            price={cartItem.price}
            quantity={cartItem.quantity}
          />
        ))
      )}
      <div className="subtotal">Subtotal: {calculateSubtotal()} CP</div>
      <Link to="/checkout" className="checkout-button">
            Checkout
          </Link>
    </div>
  );
}
