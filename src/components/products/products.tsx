import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemInformation from '../item/item';

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

        fetchProducts();
    }, []);

    const handleItemClick = (itemId: number) => {
        setSelectedItemId(itemId);
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
                                </a></td>
                            <td>{product.price} CP</td>
                            <td>
                                <input type="number" id='quantity' name='quantity' min='0' max={product.quantity} />
                            </td>
                            <td>{product.user.firstName} {product.user.lastName}</td>
                            <td><button type='submit'>Buy</button></td>
                        </tr>
                    ))}

                </tbody>
            </table>
            {selectedItemId && <ItemInformation itemId ={selectedItemId} />}
        </div>
    );
};

export default ProductList;