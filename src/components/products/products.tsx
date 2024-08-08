// import Product from "../product/product";
// // import "./products.css"
// import {Col, Row} from "react-bootstrap"
// import {useState, useEffect} from "react"

// interface productInterface {
//     inventoryId: number;
//     user: {
//         userId: number;
//         firstName: string;
//         lastName: string;
//     }
//     item: {
//          itemId: number;
//          description: string;
//           image: null;
//           name: string;
//     };
//     price: number;
//     quantity: number;
// }

// export default function Products() {
//     const[products, setProducts] = useState([]);
    
//     useEffect(() => { 
//         fetch("http://localhost:8080/inventories", 
//             {
//                 method: "GET",
//                 headers: {
//                     'Content-Type': 'application/json'}
//             }).then((response) => { 
//                 return response.json();
//             }).then((data) => { setProducts(data);
//                 console.log(data)
//             })

//     }, [])

//     return (<>
//     <table>
//         <tr>
//             <th>Inventory Id</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Seller</th>
//         </tr>
//         {products.map(product: productInterface) => {

//         }}
        
        
//         {/* {products.map((product: productInterface) => {
//             return (<Product key={product.inventoryId} inventoryId= {product.inventoryId} name = {product.item.name}
//             price = {product.price} quantity = {product.quantity} seller={product.user.firstName}/>)
//         })} */}
//     </table>
        
    
    
//     </>)

// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from '../profile/profile';

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
                            <td>{product.item.name}</td>
                            <td>{product.price} CP</td>
                            {/* <td>{product.quantity}</td> */}
                            <td>
                                <input type="number" id='quantity' name='quantity' min='0' max={product.quantity} />
                            </td>
                            <td>{product.user.firstName} {product.user.lastName}</td>
                            <td><button>Buy</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;