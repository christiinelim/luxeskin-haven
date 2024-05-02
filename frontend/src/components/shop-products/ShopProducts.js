import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';
import { SellerContext } from '../../context/SellerContext';
import styles from './styles.module.css';

const ShopProducts = () => {
    // PENDING REFACTORING

    
    const navigate = useNavigate();
    const productContext = useContext(ProductContext);
    const cartContext = useContext(CartContext);
    const sellerContext = useContext(SellerContext);
    const { register, handleSubmit, setError, getValues, setValue, formState: { errors, isSubmitting } } = useForm();
    const [ products, setProducts ] = useState(null);
    const [ addedProductId, setAddedProductId ] = useState(null);
    const [ insufficient, setInsufficient ] = useState(false);
    const [ showSort, setShowSort ] = useState(false);
    const [ showFilter, setShowFilter ] = useState(false);
    const [ categories, setCategories ] = useState(null);
    const [ selectedCategories, setSelectedCategories ] = useState([]);
    const [ skinTypes, setSkinTypes ] = useState([]);
    const [ sellers, setSellers ] = useState({});
    const [ selectedSellers, setSelectedSellers ] = useState([]);
    const [ selectedSkinTypes, setSelectedSkinTypes ] = useState([]);
    const [ selectedAvailability, setSelectedAvailability ] = useState('');
    const [ minPrice, setMinPrice ] = useState('');
    const [ maxPrice, setMaxPrice ] = useState('');

    useEffect(() => {
        
        const fetchData = async() => {
            try {
                const response = await productContext.getAllProducts();
                const data = response.data;
                setProducts(data);

                const allCategories = await productContext.getAllCategories();
                const categoriesData = allCategories.data;
                setCategories(categoriesData);

                const allSkinTypes = await productContext.getAllSkinTypes();
                const skinTypesData = allSkinTypes.data;
                setSkinTypes(skinTypesData);

                const allSellers = await sellerContext.getSellers();
                const sellersMap = allSellers.data.reduce((acc, seller) => {
                    acc[seller.id] = seller.username;
                    return acc;
                }, {});
                setSellers(sellersMap);
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
        
    }, []);

    const handleAddToBag = async (productId) => {
        try {
            const data = {
                product_id: productId,
                user_id: localStorage.getItem('userId'),
                quantity: 1
            }
            const response = await cartContext.addToCart(data);
            if (response.error) {
                setInsufficient(true)
            }
            setAddedProductId(productId);
            setTimeout(() => {
                setAddedProductId(null);
                setInsufficient(false)
            }, 2500);
        } catch (error) {
            console.log(error)
        }
    }

    const handleSortButton = () => {
        setShowSort(!showSort)
    }

    const handleFilterButton = () => {
        setShowFilter(!showFilter)
    }

    const handleSellerClick = (sellerId) => {
        setSelectedSellers((prevSelectedSellers) => {
            if (prevSelectedSellers.includes(sellerId)) {
                return prevSelectedSellers.filter((id) => id !== sellerId);
            } else {
                return [...prevSelectedSellers, sellerId];
            }
        });
    };

    const handleAvailabilityClick = (option) => {
        if (option === selectedAvailability) {
            setSelectedAvailability('');
        } else {
            setSelectedAvailability(option);
        }
    };

    const handleCategoryClick = (categoryId) => {
        const isSelected = selectedCategories.includes(categoryId);
        setSelectedCategories(prevCategories => (
            isSelected
                ? prevCategories.filter(id => id !== categoryId)
                : [...prevCategories, categoryId]
        ));
    };

    const handleSkinTypeClick = (id) => {
        setSelectedSkinTypes(prevSelectedSkinTypes => {
            if (prevSelectedSkinTypes.includes(id)) {
                return prevSelectedSkinTypes.filter(typeId => typeId !== id);
            } else {
                return [...prevSelectedSkinTypes, id];
            }
        });
    };

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            
        } catch (error) {
            setError("root", {
                message: "Error searching"
            })
        }
    }

    return (
        <>
            {showFilter && <div className="overlay">hello</div>}
            <div className='shop-wrapper'>
                <div className='page-header'>Shop Products</div>
                <div className={styles['sort-filter-wrapper']}>
                    <div className={styles['sort-filter-button']} onClick={ handleSortButton }>
                        <div>
                            <i className={`bi bi-sort-down ${styles['sort-filter-icon']}`}></i>
                        </div>
                        <div>Sort By</div>
                    </div>
                    <div className={styles['sort-filter-button']} onClick={ handleFilterButton }>
                        <div>
                            <i className="bi bi-funnel sort-filter-icon"></i>
                        </div>
                        <div>Filter</div>
                    </div>
                </div>

                { showSort && 
                    <div className={styles['sort-checkboxes-wrapper']}>
                        <div>
                            <div>
                                <input type='checkbox' value='newest' className={styles['sort-checkbox']}/><label>Newest</label>
                            </div>
                            <div>
                                <input type='checkbox' value='oldest' className={styles['sort-checkbox']}/><label>Oldest</label>
                            </div>
                            <div>
                                <input type='checkbox' value='expensive' className={styles['sort-checkbox']}/><label>Price (Highest to Lowest)</label>
                            </div>
                            <div>
                                <input type='checkbox' value='cheap' className={styles['sort-checkbox']}/><label>Price (Lowest to Highest)</label>
                            </div>
                            <div>
                                <input type='checkbox' value='a' className={styles['sort-checkbox']}/><label>A - Z</label>
                            </div>
                            <div>
                                <input type='checkbox' value='z' className={styles['sort-checkbox']}/><label>Z - A</label>
                            </div>
                        </div>
                    </div>
                }

                { showFilter && 
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={`${styles['filter-nav-wrapper']} ${showFilter ? styles['open'] : ''}`}>
                            <div className={styles['nav-exit']}>
                                <div className={styles['nav-exit-icon']} onClick={ handleFilterButton }>X</div>
                            </div>
                            <div className={styles['filter-form']}>
                                <div>
                                    <div className={styles['filter-header']}>Brand</div>
                                    <div className={styles['brand-option']}>
                                        {Object.keys(sellers).map(sellerId => (
                                            <div 
                                                key={sellerId} 
                                                className={`${styles['brand-options']} ${selectedSellers.includes(sellerId) ? styles['selected'] : ''}`}
                                                onClick={() => handleSellerClick(sellerId)}
                                            >
                                                <label>{sellers[sellerId]}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className={styles['filter-header']}>Availability</div>
                                    <div className={styles['select-option']}>
                                        <label
                                            className={`${styles['select-options']} ${selectedAvailability === 'available' ? styles['selected'] : ''}`}
                                            onClick={() => handleAvailabilityClick('available')}
                                        >
                                            In Stock
                                        </label>
                                        <label
                                            className={`${styles['select-options']} ${selectedAvailability === 'unavailable' ? styles['selected'] : ''}`}
                                            onClick={() => handleAvailabilityClick('unavailable')}
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
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                            className={styles['price-input']}
                                        />
                                        <span>-</span>
                                        <input
                                            type="number"
                                            placeholder="Max Price"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            className={styles['price-input']}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className={styles['filter-header']}>Category</div>
                                    <div className={styles['multiple-option']}>
                                        {categories && categories.map(category => (
                                            <label
                                                key={category.id}
                                                className={`${styles['select-options']} ${selectedCategories.includes(category.id) ? styles['selected'] : ''}`}
                                                onClick={() => handleCategoryClick(category.id)}
                                            >
                                                {category.category}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className={styles['filter-header']}>Skin Type</div>
                                    <div className={styles['multiple-option']}>
                                        {skinTypes && skinTypes.map(type => (
                                            <label
                                                key={type.id}
                                                className={`${styles['select-options']} ${selectedSkinTypes.includes(type.id) ? styles['selected'] : ''}`}
                                                onClick={() => handleSkinTypeClick(type.id)}
                                            >
                                                {type.skin_type}
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
                            { errors.root && <div className="form-message form-error-box"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.root.message }</div> }
                        </div>
                    </form>
                }

                { products && (
                    <div className={styles['products-wrapper']}>
                        <div className='row'>
                            { products.map((product, index) => (
                                <div className='col-4 col-sm-3 col-lg-2 product-cards' key={index}>
                                    <div className='shop-product-card' onClick={ () => navigate('/listing/' + product.id) }>
                                        <div className='shop-product-image'><img src={ product.image } alt={product.name} /></div>
                                        <div>
                                            <div className='shop-product-header-wrapper'>
                                                <div>{ product.seller.username }</div>
                                                <div>${ (product.cost).toFixed(2) }</div>
                                            </div>
                                            <div className='shop-product-name'>{ product.name }</div>
                                        </div>
                                    </div>
                                    <div className='button-border add-to-bag-button' onClick={ () => handleAddToBag(product.id) }>
                                        { addedProductId === product.id ? (insufficient ? "Insufficient stock" : "Added!") : "Add to Bag" }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ShopProducts;