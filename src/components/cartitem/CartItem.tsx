import "./CartItem.css";
interface cartProps {
  key: number;
  quantity: number;
  name: string;
  price: number;
}

export default function CartItem({ quantity, name, price }: cartProps) {
  return (
    <>
      <div className="cart-item">
        <div className="product-name">{name}</div>
        <div className="price">{price} CP</div>
      </div>
    </>
  );
}
