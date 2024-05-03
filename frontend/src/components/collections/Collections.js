import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import styles from './styles.module.css';

const Collections = () => {
    const navigate = useNavigate();
    const productContext = useContext(ProductContext);

    const handleSearch = (categoryId) => {
        try {
            navigate('/shop/search-product/?category=' + categoryId);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className={`row ${styles['categories-wrapper']}`}>
            { productContext.categories.map((category) => (
                <div key={ category.id } className={`col-4 ${styles['category-wrapper']}`} style={{ backgroundImage: `url(${require(`../../assets/images/main/${category.category.toLowerCase()}.png`)})` }}>
                    <div className={styles['category-button']} onClick={ () => handleSearch(category.id)}>{ category.category }</div>
                </div>
            ))}
        </div>
    )
}

export default Collections;
