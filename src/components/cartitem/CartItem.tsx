import "./CartItem.css";
import { useCart } from "../../context/CartContext"
import axios from "axios";

interface cartProps {
  id: number;
  quantity: number;
  name: string;
  price: number;

}

export default function CartItem({ id, quantity, name, price }: cartProps) {

    const { removeItem } = useCart();

    const handleRemoveClick = async () => {
        try {
          // Make the DELETE request to remove the item from the server
          await axios.delete(`http://localhost:8080/cart-items/${id}`);
          
          // Call removeItem to update the local cart state
          removeItem(id);
        } catch (error) {
          console.error('Error removing item from cart:', error);
        }
      };

      
  return (
    <div className="cart-container">
      <div className="cart-box">
        <div className="cart-item">
          <div className="product-info">
            <div className="product-name">{name}</div>
            <div className="quantity">Qty: {quantity}</div>
          </div>
          <div className="price">{price} CP</div>
          <button className="remove-button" onClick={handleRemoveClick}>Remove</button>
        </div>
      </div>
    </div>
  );
}
