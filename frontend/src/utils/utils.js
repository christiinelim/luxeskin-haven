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