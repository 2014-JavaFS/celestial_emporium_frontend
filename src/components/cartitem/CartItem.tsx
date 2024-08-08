import "./CartItem.css"
interface cartProps {
  key: number;
  quantity: number;
  name: string;
  price: number;
}

export default function CartItem({ quantity, name, price }: cartProps) {
  return (
    <>
      <h3>{name}</h3>
      <h4>{price} coins</h4>
      <h4>Qty: {quantity}</h4>

      <div className="cart-item">
        <div className="product-name">{name}</div>
        <div className="price">{price} CP</div>
    </div>
    </>
  );
}
