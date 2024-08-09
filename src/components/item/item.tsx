import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ItemInformationProps {
    itemId: number; // The ID of the product to fetch details for
}

interface ItemInformation {
    itemId: number;
    name: string;
    description: string;
    image: string;
}

const ItemInformation: React.FC<ItemInformationProps> = ({ itemId }) => {
    const [itemInformation, setItemInformation] = useState<ItemInformation | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get<ItemInformation>(`http://localhost:8080/items/${itemId}`);
                setItemInformation(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching product details');
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [itemId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {itemInformation ? (
                <div>
                    <h2>{itemInformation.name}</h2>
                    <img src={itemInformation.image} alt={itemInformation.name} />
                    <p>{itemInformation.description}</p>
                </div>
            ) : (
                <p>No product details available</p>
            )}
        </div>
    );
};

export default ItemInformation;