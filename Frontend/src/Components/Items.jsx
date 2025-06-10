import { useState } from 'react';
import Placeholder from '../../public/placeholder.webp';

function Items({ items, addToCart }) {
    console.log('Items component rendered with items:', items);

    const [quantities, setQuantities] = useState({});

    const increaseQty = (itemId) => {
        setQuantities((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
    };

    const decreaseQty = (itemId) => {
        setQuantities((prev) => ({
            ...prev,
            [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
        }));
    };

    const handleAddToCart = (itemId) => {
        const qty = quantities[itemId] || 0;
        // if (qty > 0) {
        //     addToCart(itemId, qty);
        // }
        if( qty > 0) {
            addToCart(itemId, qty);
            setQuantities((prev) => ({
                ...prev,
                [itemId]: 0, // Reset quantity after adding to cart
            }));
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {items.map((item) => (
                <div
                    key={item._id} 
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center"
                >
                    <img
                        src={item.image || Placeholder}
                        alt={item.name}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = Placeholder;
                        }}
                        className="w-full h-40 object-cover rounded-xl mb-3"
                    />
                    <h3 className="text-lg font-semibold text-center mb-1">{item.name}</h3>
                    <p className="text-md font-medium text-gray-800 mb-2">₹{item.price}</p>

                    <div className="flex items-center space-x-2 my-2">
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            onClick={() => decreaseQty(item._id)} 
                        >
                            –
                        </button>
                        <span className="min-w-[20px] text-center">{quantities[item._id] || 0}</span>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                            onClick={() => increaseQty(item._id)} 
                        >
                            +
                        </button>
                    </div>

                    <button
                        className={`mt-2 ${quantities[item._id] > 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'} text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-100`}
                        onClick={() => handleAddToCart(item._id)} 
                        disabled={quantities[item._id] === 0}
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Items;