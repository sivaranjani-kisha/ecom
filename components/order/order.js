"use client";

import { useState,useEffect } from 'react';
import Link from 'next/link';
import { FiChevronRight, FiClock, FiCheckCircle, FiTruck, FiShoppingBag } from 'react-icons/fi';
import { RiAccountCircleFill } from "react-icons/ri";
import { FaAddressBook } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa6";
import {AuthModal} from '@/components/AuthModal';
export default function Order() {
  const [activeFilter, setActiveFilter] = useState('all');
   const [showAuthModal, setShowAuthModal] = useState(false);
    const [authError, setAuthError] = useState('');
      const [loading, setLoading] = useState(true);
    
  // Sample order data
  const orders = [
    {
      id: '20250228_OL_801236',
      product: 'Bosch Combo Pack Dishwasher - Detergent, Salt & Rinse Aid (17008714)',
      price: 'Rs. 793.00',
      date: '2025-03-04',
      status: 'delivered',
      payment: 'Cash On Delivery',
      image: '/user/gadgets.jpg'
    },
    
  ];

  const filteredOrders = activeFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeFilter);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setShowAuthModal(true);
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        // Fetch cart data
        const cartResponse = await fetch('/api/order', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!cartResponse.ok) {
          throw new Error('Failed to fetch cart data');
        }

        // const cartData = await cartResponse.json();
        // setCartItems(cartData.cart.items);

        // // Fetch user address
        // const addressResponse = await fetch(`/api/useraddress?user_id=${userId}`);
        // if (!addressResponse.ok) {
        //   throw new Error('Failed to fetch address data');
        // }

        // const addressData = await addressResponse.json();
        // setUseraddress(addressData.userAddress);

        // Pre-fill form with first address if available
       
      } catch (error) {
       
        toast.error("Failed to load checkout data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with Breadcrumb */}
      <div className="bg-blue-50 py-6 px-8 flex justify-between items-center border-b border-gray-200 shadow-sm">
        
          <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
          <div className="flex items-center space-x-2 text-sm mt-1">
            <span className="text-gray-600">🏠 Home</span>
            <FiChevronRight className="text-gray-400" />
            <span className="text-gray-500">Shop</span>
            <FiChevronRight className="text-gray-400" />
            <span className="text-customBlue font-medium">Orders</span>
          </div>
      </div>

      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl border border-gray-200  hover:border-customBlue transition-all duration-300 shadow-sm">
              <h3 className="text-lg font-semibold text-customBlue mb-6 pb-2 border-b border-gray-100 hover:border-customBlue transition-all duration-300">My Account</h3>
              <nav className="space-y-2">
              <Link href="/profile" className="w-full flex items-center gap-2 px-5 py-3 text-lg text-base font-medium text-gray-700 rounded-lg transition-all duration-200 hover:text-customBlue hover:bg-blue-100 hover:pl-6">
                <RiAccountCircleFill className="text-customBlue text-2xl" />
                  <span>Profile</span>
              </Link>
              <Link href="/address" className="w-full flex items-center gap-2 px-5 py-3 text-lg text-base font-medium text-gray-600 rounded-lg transition-all duration-200 hover:text-customBlue hover:bg-blue-100 hover:pl-6">
                <FaAddressBook className="text-customBlue text-2xl"/>
                  <span>Addresses</span>
              </Link>
              <Link href="/orders" className="w-full flex items-center gap-2 px-5 py-3 text-lg text-base font-medium text-gray-600 rounded-lg transition-all duration-200 hover:text-customBlue hover:bg-blue-100 hover:pl-6">
                <HiShoppingBag className="text-customBlue text-2xl"/>
                  <span>Orders</span>
              </Link>
              <Link href="/wishlist" className="w-full flex items-center gap-2 px-5 py-3 text-lg text-base font-medium text-gray-600 rounded-lg transition-all duration-200 hover:text-customBlue hover:bg-blue-100 hover:pl-6">
                <FaHeart className="text-customBlue text-2xl"/>
                  <span>Wishlist</span>
              </Link>
              </nav>
            </div>
          </div>

          {/* Main Content - Orders */}
          <div className="flex-1">
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-customBlue transition-all duration-300 shadow-sm">
              {/* Order Filters */}
              <div className="flex flex-wrap gap-3 mb-6 pb-4 border-b border-gray-100">
                <button 
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'all' ? 'bg-customBlue text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  All Orders
                </button>
                <button 
                  onClick={() => setActiveFilter('processing')}
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${activeFilter === 'processing' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <FiClock className="mr-1" /> Pending
                </button>
                <button 
                  onClick={() => setActiveFilter('delivered')}
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${activeFilter === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <FiCheckCircle className="mr-1" /> Delivered
                </button>
                <button 
                  onClick={() => setActiveFilter('delivered')}
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${activeFilter === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <FiCheckCircle className="mr-1" /> Delivered
                </button>
              </div>

              {/* Orders List */}
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <FiShoppingBag className="mx-auto text-4xl text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">No orders found</h3>
                  <p className="text-gray-500 mt-1">You haven't placed any orders yet</p>
                  <button className="mt-6 px-6 py-2 bg-customBlue text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order, index) => (
                    <div key={order.id} className="p-5 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Product Image */}
                        <div className="w-full md:w-32 flex-shrink-0">
                          <img 
                            src={order.image} 
                            alt={order.product} 
                            className="w-full h-32 object-contain rounded-lg border border-gray-200"
                          />
                        </div>
                        
                        {/* Order Details */}
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">Order #{order.id}</p>
                              <h3 className="font-medium text-gray-800 mb-2">{order.product}</h3>
                              <p className="text-lg font-semibold text-gray-900 mb-3">{order.price}</p>
                            </div>
                            
                            {/* Status Badge */}
                            <div className={`px-3 py-1 rounded-full text-xs font-medium self-start ${
                              order.status === 'delivered' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {order.status === 'delivered' ? (
                                <span className="flex items-center">
                                  <FiCheckCircle className="mr-1" /> Delivered
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  <FiClock className="mr-1" /> Pending
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Order Meta */}
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center text-gray-600">
                              <FiTruck className="mr-2 text-gray-400" />
                              <span>Delivered on {order.date}</span>
                            </div>
                            <div className="text-gray-600">
                              <span>Payment: {order.payment}</span>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="mt-6 flex flex-wrap gap-3">
                            <button className="px-4 py-2 bg-blue-50 text-customBlue rounded-md hover:bg-blue-100 transition-colors flex items-center">
                              <FiShoppingBag className="mr-2" />
                              Buy it Again
                            </button>
                            {order.status !== 'delivered' && (
                              <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
                                Cancel Order
                              </button>
                            )}
                            <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

       {showAuthModal && (
              <AuthModal 
                onClose={() => setShowAuthModal(false)}
                onSuccess={() => {
                  setShowAuthModal(false);
                  handleAddToCart();
                }}
                error={authError}
              />
            )}
    </div>
  );
}