import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemInformation from '../item/item';
import parseJwt from '../../util/parseJwt';

interface Inventory {
    inventoryId: number;
    user: {
        userIdNumber: number;
        email: string;
        firstName: string;
        lastName: string;
    };
    item: {
        itemId: number;
        name: string;
        description: string;
        image: string;
    };
    description: string;
    price: number;
    quantity: number;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Inventory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [cartId, setCartId] = useState<number>(1);
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<Inventory[]>('http://localhost:8080/inventories');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching data');
                setLoading(false);
            }
        };
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
        fetchProducts();
    }, []);

    const handleItemClick = (itemId: number) => {
        setSelectedItemId(itemId);
    };

    const handleBuyClick = async (product: Inventory) => {
        const quantity = parseInt((document.getElementById(`quantity-${product.inventoryId}`) as HTMLInputElement).value);

        try {
            const cartItem = {
                cart: { cartId: cartId },
                user: { userIdNumber: userId },
                item: { itemId: product.item.itemId },
                quantity: quantity,
                price: product.price,
                inventory: { inventoryId: product.inventoryId }
            };

            const response = await axios.post('http://localhost:8080/cart-items', cartItem);

            console.log('Item added to cart:', response.data);
        } catch (err) {
            console.error('Error adding item to cart', err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Product List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Seller</th>
                        <th>Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.inventoryId}>
                            <td>{product.inventoryId}</td>
                            <td>
                                <a href="#" onClick={() => handleItemClick(product.item.itemId)}>
                                    {product.item.name}
                                </a>
                            </td>
                            <td>{product.price} CP</td>
                            <td>
                                <input type="number" id={`quantity-${product.inventoryId}`} name='quantity' min='0' max={product.quantity} defaultValue={1} />
                            </td>
                            <td>{product.user.firstName} {product.user.lastName}</td>
                            <td><button onClick={() => handleBuyClick(product)}>Buy</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedItemId && <ItemInformation itemId={selectedItemId} />}
        </div>
    );
};

export default ProductList;
