export const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear().toString(); 

    return `${day}-${month}-${year}`;
};

export const getBackgroundColorForSkinType = (skinType) => {
    switch (skinType) {
        case 'Oily':
            return '#EBBC67';
        case 'Dry':
            return '#E4D6BD';
        case 'Combination':
            return '#C4C2C1';
        case 'Sensitive':
            return '#FAC2B4';
        case 'Acne-Prone':
            return '#E8A593';
    }
};

export const setLocalStorage = (data, status) => {
    if (status === "seller") {
        localStorage.setItem("sellerId", data.id);
        localStorage.setItem("activePage", '/seller/listings');
        localStorage.setItem("status", status);
    } else {
        localStorage.setItem("userId", data.id);
        localStorage.setItem("status", status);
    }
    localStorage.setItem("email", data.email);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("isLoggedIn", 'true');
}

export const removeLocalStorage = (status) => {
    if (status === "seller") {
        localStorage.removeItem("sellerId");
        localStorage.removeItem("activePage");
    } else {
        localStorage.removeItem("userId");
    }
    localStorage.removeItem("email");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("status");
}


// export const setLocalStorage = (data, status) => {
//     const localStorageData = {
//         status,
//         email: data.email,
//         accessToken: data.accessToken,
//         refreshToken: data.refreshToken,
//         isLoggedIn: 'true'
//     };

//     if (status === "seller") {
//         localStorageData.sellerId = data.id;
//         localStorageData.activePage = '/seller/listings';
//     } else {
//         localStorageData.userId = data.id;
//     }

//     localStorage.setItem("userData", JSON.stringify(localStorageData));
// };


// export const removeLocalStorage = () => {
//     localStorage.removeItem("userData");
// }