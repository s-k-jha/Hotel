import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Carousel from './carousel';
import '../style/Login.css';
import tw from 'tailwind-styled-components';
import Items from './Items';
import Footer from './Footer';
import Header from './Header';
import CartCheckout from './CartCheckout';

function Home() {
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [cart, setCart] = useState({});
    const [isCartOpen, setIsCartOpen] = useState(false);

    const updateQuantity = (itemId, newQuantity) => {
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };
            updatedCart[itemId] = newQuantity;
            return updatedCart;
        });
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };
            delete updatedCart[itemId];
            return updatedCart;
        });
    };

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const fetchItems = async (category = '') => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You need to be logged in to view items');
            return;
        }
        try {
            const endpoint = category && category !== 'all'
                ? `http://localhost:3000/menu/${category}`
                : 'http://localhost:3000/menu';
            const response = await fetch(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
            toast.error('Failed to fetch items');
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            fetchItems(selectedCategory);
        }
    }, [selectedCategory]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const addToCart = (itemId, qty) => {
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };
            updatedCart[itemId] = (updatedCart[itemId] || 0) + qty;
            return updatedCart;
        });
    };

    const detailedCart = Object.entries(cart).map(([itemId, quantity]) => {
        const item = items.find((i) => i._id === itemId);
        return {
            id: itemId,
            name: item?.name || 'Unknown',
            price: item?.price || 0,
            quantity: quantity,
            totalPrice: (item?.price || 0) * quantity,
        };
    });

    const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

    return (
        <div className="home">
            <Header cartItemCount={cartCount} cart={detailedCart} onCartClick={openCart} />
            <Carousel />

            <h1 className='slogan text-lg sm:text-xl md:text-2xl lg:text-3xl text-center mt-6'>
                Wo Khao! Jo Man Chahe!
            </h1>

            <div className='flex flex-col gap-4 md:flex-row md:justify-between md:items-center w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mt-6 mb-4'>
                {/* Category Filter */}
                <div className='w-full md:w-1/4 lg:w-1/6'>
                    <Select id="food-filter" value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="all">All</option>
                        <option value="sweet">Sweet</option>
                        <option value="sour">Sour</option>
                        <option value="spicy">Spicy</option>
                    </Select>
                </div>

                {/* Heading */}
                <div className='w-full text-center md:w-2/4 lg:w-2/3'>
                    <h2 className="font-bold text-xl sm:text-2xl text-red-500 animate-pulse tracking-wide drop-shadow-md">
                        POPULAR PRODUCTS
                    </h2>
                </div>

                {/* Search Bar */}
                <div className='w-full md:w-1/3'>
                    <input
                        type="text"
                        id="search"
                        placeholder="Search for items..."
                        className="w-full px-3 py-2 border rounded bg-white"
                    />
                </div>
            </div>

            <Items items={items} addToCart={addToCart} />

            <CartCheckout
                isOpen={isCartOpen}
                onClose={closeCart}
                items={detailedCart}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
            />
            <Footer />
        </div>
    );
}

const Select = tw.select`w-full px-3 py-2 border rounded bg-white`;

export default Home;