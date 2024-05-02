import React, { useState, useEffect, useContext } from 'react';
import { OrderContext } from '../../context/OrderContext';


const UserOrder = () => {
    const userId = localStorage.getItem("userId");
    const orderContext = useContext(OrderContext);
    const [ orders, setOrders ] = useState(null);

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

                // Update state with processed orders
                setOrders(processedOrders);
                console.log(processedOrders)

            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
        
    }, []);

    // console.log(orders)

}

export default UserOrder