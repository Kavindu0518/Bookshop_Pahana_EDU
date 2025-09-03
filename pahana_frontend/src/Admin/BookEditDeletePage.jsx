
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderView = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    // Fetch all orders
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/api/checkout');
            console.log('Fetched Orders:', response.data);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    // Delete an order by ID
    const deleteOrder = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/checkout/${id}`);
            setOrders(orders.filter(order => order.id !== id));
            setDeleteConfirm(null);
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // // Format currency
    // const formatCurrency = (amount) => {
    //     if (amount === undefined || amount === null) return 'N/A';
    //     return new Intl.NumberFormat('en-US', {
    //         style: 'currency',
    //         currency: ''
    //     }).format(amount);
    // };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-amber-50 flex items-center justify-center relative overflow-hidden">
                {/* Background with bookshop theme */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-brown-900/10"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTAgMGg6MHY2MEgweiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
                </div>
                
                <div className="flex flex-col items-center z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mb-4"></div>
                    <p className="text-amber-700">Loading orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-amber-50 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background with bookshop theme */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-brown-900/10"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
            </div>
            
            {/* Decorative book elements */}
            <div className="absolute top-10 left-10 w-16 h-16 z-10 opacity-20">
                <div className="w-full h-full bg-amber-400 rounded-lg transform rotate-12 shadow-lg"></div>
            </div>
            <div className="absolute bottom-16 right-14 w-20 h-12 z-10 opacity-20">
                <div className="w-full h-full bg-red-600 rounded transform -rotate-6 shadow-lg"></div>
            </div>
            <div className="absolute top-1/3 right-1/4 w-14 h-10 z-10 opacity-20">
                <div className="w-full h-full bg-green-600 rounded transform rotate-45 shadow-lg"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-amber-100">
                    <div className="px-6 py-5 border-b border-amber-200 bg-gradient-to-r from-amber-600 to-amber-800">
                        <h1 className="text-2xl font-bold text-white font-serif">Order Management</h1>
                        <p className="mt-1 text-amber-100">View and manage all customer orders</p>
                    </div>
                    
                    <div className="px-6 py-4 bg-amber-50 flex justify-between items-center">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="pl-10 pr-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 w-64"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <button 
                            onClick={fetchOrders}
                            className="bg-white text-amber-700 px-4 py-2 rounded-lg border border-amber-200 hover:bg-amber-100 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200"
                        >
                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                            Refresh
                        </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-amber-100">
                            <thead className="bg-amber-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-amber-100">
                                {orders.length > 0 ? orders.map(order => (
                                    <tr key={order.id} className="hover:bg-amber-50 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-amber-900">#{order.id}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                                                    <span className="text-amber-600 font-medium">
                                                        {order.name ? order.name.charAt(0).toUpperCase() : 'C'}
                                                    </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-amber-900">{order.name || 'Customer'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-amber-900 font-semibold">Rs.{(order.totalPrice)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-amber-700">{order.email || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                                                Completed
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button className="text-amber-600 hover:text-amber-900">
                                                    View
                                                </button>
                                                <button 
                                                    className="text-red-600 hover:text-red-900"
                                                    onClick={() => setDeleteConfirm(order.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-amber-700">
                                            No orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="px-6 py-4 bg-amber-50 border-t border-amber-200 flex items-center justify-between">
                        <div className="text-sm text-amber-700">
                            Showing <span className="font-medium">{orders.length}</span> results
                        </div>
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 text-sm font-medium text-amber-700 bg-amber-100 rounded-md hover:bg-amber-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200">
                                Previous
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-amber-700 bg-amber-100 rounded-md hover:bg-amber-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6 border border-amber-100">
                        <h3 className="text-lg font-medium text-amber-900 mb-2 font-serif">Confirm Deletion</h3>
                        <p className="text-amber-700 mb-4">Are you sure you want to delete this order? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 text-amber-700 bg-amber-100 rounded-md hover:bg-amber-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200"
                                onClick={() => setDeleteConfirm(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200"
                                onClick={() => deleteOrder(deleteConfirm)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderView;