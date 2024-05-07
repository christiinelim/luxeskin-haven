export const addToCartGuest = (productId, quantity) => {
    const cartData = JSON.parse(localStorage.getItem('guestCart')) || [];
    const existingItem = cartData.find(item => item.product_id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartData.push({ product_id: productId, quantity });
    }

    localStorage.setItem('guestCart', JSON.stringify(cartData));
};

export const updateCartItemGuest = (productId, newQuantity) => {
    console.log('here')
    console.log(productId);
    console.log(newQuantity)
    const cartData = JSON.parse(localStorage.getItem('guestCart')) || [];
    const updatedCartData = cartData.map(item => {
        if (item.product_id === productId) {
            return { ...item, quantity: newQuantity };
        }
        return item;
    });

    localStorage.setItem('guestCart', JSON.stringify(updatedCartData));
};

export const deleteCartItemGuest = (productId) => {
    const cartData = JSON.parse(localStorage.getItem('guestCart')) || [];
    const updatedCartData = cartData.filter(item => item.product_id !== productId);

    localStorage.setItem('guestCart', JSON.stringify(updatedCartData));
};

export const getGuestCart = () => {
    const cartData = JSON.parse(localStorage.getItem('guestCart')) || [];
    return cartData;
};

export const clearGuestCart = () => {
    localStorage.removeItem('guestCart');
}
