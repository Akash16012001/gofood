import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState({});

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            try {
                const response = await fetch("http://localhost:4000/api/myorderData", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: userEmail
                    })
                });
                const data = await response.json();
                setOrderData(data);
            } catch (error) {
                console.error("Error fetching order data:", error.message);
            }
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>
                    {Object.keys(orderData).length === 0 ? (
                        <p>No order data available</p>
                    ) : (
                        orderData.orderData &&
                        orderData.orderData.order_data
                            .slice(0)
                            .reverse()
                            .map((item, index) => (
                                <div key={index}>
                                    {Array.isArray(item) ? (
                                        item.map((arrayData, arrayIndex) => (
                                            <div key={arrayIndex}>
                                                {arrayData.Order_date ? (
                                                    <div className='m-auto mt-5'>
                                                        {arrayData.Order_date}
                                                        <hr />
                                                    </div>
                                                ) : (
                                                    <div className='col-12 col-md-6 col-lg-3'>
                                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                            <div className="card-body">
                                                                <h5 className="card-title">{arrayData.name}</h5>
                                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                    <span className='m-1'>{arrayData.qty}</span>
                                                                    <span className='m-1'>{arrayData.size}</span>
                                                                    <span className='m-1'>{arrayData.Order_date}</span>
                                                                    <div className=' d-inline ms-2 h-100 w-20 fs-5'>
                                                                        ₹{arrayData.price}/-
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>Invalid order data format</p>
                                    )}
                                </div>
                            ))
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}