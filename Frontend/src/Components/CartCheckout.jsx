import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import { X, ShoppingCart, Minus, Plus } from 'lucide-react';
import OrderSuccess from './OrderSuccess';

function CartCheckout({ isOpen, onClose, items = [], onUpdateQuantity, onRemoveItem }) {
    const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const [showOrderSuccess, setShowOrderSuccess] = useState(false);

    if (!isOpen) return null;

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            onRemoveItem(itemId);
        } else {
            onUpdateQuantity(itemId, newQuantity);
        }
    };
    const handleCheckout = () => {
        setShowOrderSuccess(true);
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black/10 backdrop-blur-md z-40"
                onClick={onClose}
            />


            <ModalContainer>
                <ModalHeader>
                    <HeaderTitle>
                        <ShoppingCart className="h-6 w-6 text-red-500" />
                        Your Cart ({totalItems} items)
                    </HeaderTitle>
                    <CloseButton onClick={onClose}>
                        <X className="h-6 w-6" />
                    </CloseButton>
                </ModalHeader>

                <ModalContent>
                    {showOrderSuccess ? (
                        <OrderSuccess
                            setShowOrderSuccess={setShowOrderSuccess}
                        />
                    ) : items.length === 0 ? (
                        <EmptyCart>
                            <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-center">Your cart is empty</p>
                        </EmptyCart>
                    ) : (
                        <>
                            <ItemsList>
                                {items.map((item) => (
                                    <CartItem key={item.id}>
                                        <ItemInfo>
                                            <ItemName>{item.name}</ItemName>
                                            <ItemPrice>₹{item.price}</ItemPrice>
                                        </ItemInfo>

                                        <QuantityControls>
                                            <QuantityButton
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </QuantityButton>
                                            <QuantityDisplay>{item.quantity}</QuantityDisplay>
                                            <QuantityButton
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </QuantityButton>
                                        </QuantityControls>

                                        <ItemTotal>₹{item.totalPrice}</ItemTotal>

                                        <RemoveButton
                                            onClick={() => onRemoveItem(item.id)}
                                        >
                                            <X className="h-4 w-4" />
                                        </RemoveButton>
                                    </CartItem>
                                ))}
                            </ItemsList>

                            <TotalSection>
                                <TotalRow>
                                    <TotalLabel>Subtotal:</TotalLabel>
                                    <TotalAmount>₹{totalAmount}</TotalAmount>
                                </TotalRow>
                                <TotalRow>
                                    <TotalLabel>Delivery Fee:</TotalLabel>
                                    <TotalAmount>₹40</TotalAmount>
                                </TotalRow>
                                <Divider />
                                <TotalRow className="text-lg font-bold">
                                    <TotalLabel>Total:</TotalLabel>
                                    <TotalAmount>₹{totalAmount + 40}</TotalAmount>
                                </TotalRow>
                            </TotalSection>

                            <CheckoutButton onClick={handleCheckout}>
                                Proceed to Checkout
                            </CheckoutButton>
                        </>
                    )}
                </ModalContent>
            </ModalContainer>
        </>
    );
}


const ModalContainer = tw.div`
  fixed right-0 top-0 h-full w-full sm:w-2/3 lg:w-1/3 bg-white shadow-2xl z-50 
  flex flex-col overflow-hidden transition-all duration-300
`;


const HeaderTitle = tw.h2`
    text-xl font-bold text-gray-800 flex items-center gap-2
`;

const CloseButton = tw.button`
    p-2 hover:bg-gray-200 rounded-full transition-colors
`;

const ModalContent = tw.div`
  flex-1 flex flex-col overflow-y-auto
`;


const EmptyCart = tw.div`
    flex-1 flex flex-col items-center justify-center p-8
`;


const CartItem = tw.div`
  flex flex-wrap sm:flex-nowrap items-start gap-3 p-4 bg-gray-50 
  rounded-lg border border-gray-200
`;

const ItemInfo = tw.div`
  flex-1 min-w-[8rem] sm:min-w-[12rem]
`;


const ItemName = tw.h3`
    font-medium text-gray-800 truncate
`;

const ItemPrice = tw.p`
    text-sm text-gray-600
`;

const QuantityControls = tw.div`
    flex items-center gap-2 bg-white rounded-lg border border-gray-300
`;

const QuantityButton = tw.button`
    p-2 hover:bg-gray-100 transition-colors
`;

const QuantityDisplay = tw.span`
    px-3 py-1 font-medium min-w-[2rem] text-center
`;

const ItemTotal = tw.div`
    font-bold text-gray-800 min-w-[4rem] text-right
`;

const RemoveButton = tw.button`
    p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors
`;

const ModalHeader = tw.div`
  flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200 bg-gray-50
`;

const ItemsList = tw.div`
  flex-1 overflow-y-auto px-4 py-2 space-y-4
`;

const TotalSection = tw.div`
  px-4 py-4 sm:p-6 border-t border-gray-200 bg-gray-50
`;


const TotalRow = tw.div`
    flex justify-between items-center py-2
`;

const TotalLabel = tw.span`
    text-gray-700
`;

const TotalAmount = tw.span`
    font-medium text-gray-800
`;

const Divider = tw.hr`
    my-3 border-gray-300
`;

const CheckoutButton = tw.button`
    w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 
    rounded-lg transition-colors mt-4
`;

export default CartCheckout;