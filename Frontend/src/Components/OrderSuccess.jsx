import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from "react-router-dom";


const OrderSuccess = ({setShowOrderSuccess}) => {
      const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-8 w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
          <Check className="w-12 h-12 text-white" strokeWidth={3} />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Successful!
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed and is being processed.
        </p>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="text-sm text-gray-500 mb-2">Order Number</div>
          <div className="text-lg font-semibold text-gray-900">#ORD-2024-001</div>
        </div>
        
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200" onClick={()=>{setShowOrderSuccess(false)}}>
          Continue Shopping
        </button>
        
        <p className="text-sm text-gray-500 mt-4">
          You will receive an email confirmation shortly.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;