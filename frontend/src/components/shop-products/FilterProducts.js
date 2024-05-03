import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css';

const FilterProducts = ({ categories, skinTypes, sellers, showFilter, setShowFilter }) => {
    const [formData, setFormData] = useState({
        selectedSellers: [],
        selectedSkinTypes: [],
        selectedAvailability: '',
        minPrice: '',
        maxPrice: '',
        selectedCategories: [],
    });

    const { handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

    const handleFilterButton = () => {
        setShowFilter(!showFilter);
    };

    const handleCheckboxClick = (id, key) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: prevState[key].includes(id)
                ? prevState[key].filter(item => item !== id)
                : [...prevState[key], id],
        }));
    };

    const handleAvailabilityClick = (option) => {
        setFormData(prevState => ({
            ...prevState,
            selectedAvailability: prevState.selectedAvailability === option ? '' : option,
        }));
    };

    const handlePriceChange = (e, key) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: e.target.value,
        }));
    };

    const onSubmit = async () => {
        try {
            console.log(formData)
            await new Promise((resolve) => setTimeout(resolve, 1000));
            
        } catch (error) {
            setError("root", {
                message: "Error searching"
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`${styles['filter-nav-wrapper']} ${showFilter ? styles['open'] : ''}`}>
                <div className={styles['nav-exit']}>
                    <div className={styles['nav-exit-icon']} onClick={ handleFilterButton }>X</div>
                </div>
                <div className={styles['filter-form']}>
                    <div>
                        <div className={styles['filter-header']}>Brand</div>
                        <div className={styles['brand-option']}>
                            { Object.keys(sellers).map(sellerId => (
                                <div 
                                    key={ sellerId } 
                                    className={`${styles['brand-options']} ${formData.selectedSellers.includes(sellerId) ? styles['selected'] : ''}`}
                                    onClick={ () => handleCheckboxClick(sellerId, 'selectedSellers') }
                                >
                                    <label>{ sellers[sellerId] }</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className={styles['filter-header']}>Availability</div>
                        <div className={styles['select-option']}>
                            <label
                                className={`${styles['select-options']} ${formData.selectedAvailability === 'available' ? styles['selected'] : ''}`}
                                onClick={ () => handleAvailabilityClick('available') }
                            >
                                In Stock
                            </label>
                            <label
                                className={`${styles['select-options']} ${formData.selectedAvailability === 'unavailable' ? styles['selected'] : ''}`}
                                onClick={ () => handleAvailabilityClick('unavailable') }
                            >
                                Out of Stock
                            </label>
                        </div>
                    </div>
                    <div className={styles['price-filter']}>
                        <div className={styles['filter-header']}>Price</div>
                        <div className={styles['price-inputs']}>
                            <input
                                type="number"
                                placeholder="Min Price"
                                value={ formData.minPrice }
                                onChange={ (e) => handlePriceChange(e, 'minPrice') }
                                className={styles['price-input']}
                            />
                            <span>-</span>
                            <input
                                type="number"
                                placeholder="Max Price"
                                value={ formData.maxPrice }
                                onChange={ (e) => handlePriceChange(e, 'maxPrice') }
                                className={styles['price-input']}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={styles['filter-header']}>Category</div>
                        <div className={styles['multiple-option']}>
                            { categories && categories.map(category => (
                                <label
                                    key={ category.id }
                                    className={`${styles['select-options']} ${formData.selectedCategories.includes(category.id) ? styles['selected'] : ''}`}
                                    onClick={ () => handleCheckboxClick(category.id, 'selectedCategories') }
                                >
                                    { category.category }
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className={styles['filter-header']}>Skin Type</div>
                        <div className={styles['multiple-option']}>
                            { skinTypes && skinTypes.map(type => (
                                <label
                                    key={ type.id }
                                    className={`${styles['select-options']} ${formData.selectedSkinTypes.includes(type.id) ? styles['selected'] : ''}`}
                                    onClick={ () => handleCheckboxClick(type.id, 'selectedSkinTypes') }
                                >
                                    { type.skin_type }
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="submit-button-container">
                    <button disabled={ isSubmitting } type="submit" className="button-full submit-button">
                        { isSubmitting ? "Searching" : "Search" }
                    </button>
                </div>
                { errors.root && <div className="form-message form-error-box"><i className="bi bi-exclamation-circle form-icon"></i>{errors.root.message}</div> }
            </div>
        </form>
    );
};

export default FilterProducts;
