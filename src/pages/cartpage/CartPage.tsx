import { Link } from "react-router-dom";
import AllCartItems from "../../components/cart/Cart";
import "../../components/cartitem/CartItem.css";

export default function CartPage() {
  return (
    <>
      <AllCartItems />
      <Link
        to="/checkout"
        className="checkout-button"
        style={{ maxWidth: "500px" }}
      >
        Checkout
      </Link>
    </>
  );
}
