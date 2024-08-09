import "./CartItem.css";

interface cartProps {
  key: number;
  quantity: number;
  name: string;
  price: number;
}

export default function CartItem({ quantity, name, price,  }: cartProps) {
  return (
    <div className="cart-container">
      <div className="cart-box">
        <div className="cart-item">
          <div className="product-info">
            <div className="product-name">{name}</div>
            <div className="quantity">Qty: {quantity}</div>
          </div>
          <div className="price">{price} CP</div>

        </div>
      </div>
    </div>
  );
}
