import React, { useState, useContext, useEffect } from 'react';
import { OrderContext } from '../../../context/OrderContext';
import { getUserLocalStorage } from '../../../utils/utils';
import styles from './styles.module.css';

const SellerOrders = () => {
    const orderContext = useContext(OrderContext);
    const [ orders, setOrders ] = useState({});
    const [ expandedOrders, setExpandedOrders ] = useState({});
    const [ isEditing, setIsEditing ] = useState({});
    const [ selectedStatus, setSelectedStatus ] = useState({});
    const sellerId = getUserLocalStorage().sellerId;

    useEffect(() => {
        fetchData();
    }, [sellerId]);

    const sortedOrderIds = Object.keys(orders).sort((a, b) => b - a);

    const fetchData = async () => {
        try {
            const response = await orderContext.getOrderBySeller(sellerId);
            const grouped = response.data.reduce((acc, order) => {
                const { order_id } = order;
                if (acc[order_id]) {
                    acc[order_id].push(order);
                } else {
                    acc[order_id] = [order];
                }
                return acc;
            }, {});

            setOrders(grouped);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleOrders = (orderId) => {
        setExpandedOrders((prevExpandedOrders) => ({
            ...prevExpandedOrders,
            [orderId]: !prevExpandedOrders[orderId],
        }));
    };

    const handleEdit = (orderId) => {
        setIsEditing((prevIsEditing) => ({
            ...prevIsEditing,
            [orderId]: !prevIsEditing[orderId],
        }));
    };

    const handleChange = (orderId, selectedOption) => {
        setSelectedStatus((prevSelectedStatus) => ({
           ...prevSelectedStatus,
            [orderId]: selectedOption.value, 
        }));
    };

    const handleSave = async (orderId) => {
        handleEdit(orderId);
        let status = "Order Placed";
        if (selectedStatus[orderId] === "shipped") {
            status = "Shipped Out"
        }

        for (const order of orders[orderId]) {
            await orderContext.updateOrderProduct({
                id: order.id,
                status
            });
        }

        fetchData();
    }

    return (
        <div className={styles['orders-wrapper']}>
            {sortedOrderIds.map(orderId => {
                const order = orders[orderId][0];
                return (
                    <div key={orderId} className='order-container'>
                        <div className='row'>
                            <div className={`col-2 ${styles['summary-items']} ${styles['order-summary']}`} onClick={ () => toggleOrders(orderId) }>
                                <div className={styles['items-header']}>#Order</div>
                                <div className={styles['items-text']}>{ order.order_id }</div>
                            </div>

                            <div className={`col-5 ${styles['summary-items']} ${styles['order-summary']}`} onClick={ () => toggleOrders(orderId) }>
                                <div className={styles['items-header']}>Order Date</div>
                                <div className={styles['items-text']}>{ new Date(order.orders.created_at).toLocaleString() }</div>
                            </div>

                            <div className={`col-4 ${styles['summary-items']}`}>
                                <div className={styles['items-header']}>Order Status</div>
                                { !isEditing[orderId] && (
                                    <div className={styles['items-text']}>{ order.status }</div>
                                )}
                                { isEditing[orderId] && (
                                    <select onChange={(e) => handleChange(orderId, e.target)}
                                            defaultValue={order.status === 'Shipped Out' ? 'shipped' : 'placed'}
                                    >
                                        <option value='placed'>Order Placed</option>
                                        <option value='shipped'>Shipped Out</option>
                                    </select>
                                )}
                            </div>

                            <div id={styles['update-button-wrapper']} className='col-1'>
                                { !isEditing[orderId] && <div onClick={ () => handleEdit(orderId) }><i className={`bi bi-pencil ${styles['edit-icon']}`}></i></div> }
                                { isEditing[orderId] && <div onClick={ () => handleSave(orderId) }><i className={`bi bi-floppy ${styles['edit-icon']}`}></i></div> }
                            </div>
                        </div>

                        {expandedOrders[orderId] && orders[orderId].map(product => (
                            <div key={product.products.id} className={`product-container ${styles['product-wrapper']}`}>
                                <div className='order-image'>
                                    <img src={ product.products.image } alt="product image"/>
                                </div>
                                <div className='order-content'>
                                    <div>
                                        <div>{product.products.name}</div>
                                    </div>
                                    <div className='order-quantity-cost'>
                                        <div>{product.quantity}</div>
                                        <div className='order-cost'>${(product.quantity*parseFloat(product.products.cost)).toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default SellerOrders;