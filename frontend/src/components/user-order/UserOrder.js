import React, { useState, useEffect, useContext } from 'react';
import { OrderContext } from '../../context/OrderContext';
import { getUserLocalStorage } from '../../utils/utils';
import styles from './styles.module.css';


const UserOrder = () => {
    const userId = getUserLocalStorage().userId;
    const orderContext = useContext(OrderContext);
    const [ orders, setOrders ] = useState(null);
    const [ expandedOrders, setExpandedOrders ] = useState({});

    useEffect(() => {
        
        const fetchData = async() => {
            try {
                const orderResponse = await orderContext.getOrderByUser(userId);
                const ordersData = orderResponse.data;
                const processedOrders = await Promise.all(
                    ordersData.map(async (order) => {
                        const productsResponse = await orderContext.getOrderProductPivot(order.id);
                        const productsData = productsResponse.data;
                        return { ...order, products: productsData };
                    })
                );

                setOrders(processedOrders);

            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
        
    }, [userId]);

    const toggleProducts = (orderId) => {
        setExpandedOrders((prevExpandedOrders) => ({
            ...prevExpandedOrders,
            [orderId]: !prevExpandedOrders[orderId],
        }));
    };

    return (
        orders && 
        <div className={styles['order-wrapper']}>
            <div className={`page-header ${styles['order-page-header']}`}>Orders</div>
            <div className={styles['order-list-wrapper']}>
                {orders.map((order, index) => (
                    <div className='order-container' key={index}>
                        <div className={styles['order-header']} onClick={() => toggleProducts(order.id)}>Order #{order.id}</div>
                        { expandedOrders[order.id] && (
                            <div className={styles['product-wrapper']}>
                                {order.products.map((productOrder, idx) => (
                                    <div className='product-container' key={idx}>
                                        <div className='order-image'>
                                            <img src={productOrder.products.image} alt='product' />
                                        </div>
                                        <div className='order-content'>
                                            <div>
                                                <div className={styles['order-seller']}>{productOrder.products.seller.username}</div>
                                                <div className={styles['order-list']}>{productOrder.products.name}</div>
                                                <div className={styles['order-list']}>Status: {productOrder.status}</div>
                                            </div>
                                            <div className='order-quantity-cost'>
                                                <div>{productOrder.quantity}</div>
                                                <div className='order-cost'>${parseFloat(productOrder.products.cost * productOrder.quantity).toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className={styles['summary-container']}>
                                    <div className={styles['summary-items']}>
                                        <div>Total Cost</div>
                                        <div className={styles['summary-items-header']}>${parseFloat(order.total_cost).toFixed(2)}</div>
                                    </div>
                                    <div className={styles['summary-divider']}></div>
                                    <div className={styles['summary-items']}>
                                        <div>Date of Purchase</div>
                                        <div className={styles['summary-items-header']}>{new Date(order.created_at).toLocaleString()}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>


    )

}

export default UserOrder