import { Link } from "react-router-dom";
import AllCartItems from "../../components/cart/Cart";
import "./CartItem.css";

export default function CartPage() {
  return (
    <>
      <AllCartItems />
      <Link to="/checkout" className="checkout-button">
            Checkout
          </Link>
    </>
  );
}
