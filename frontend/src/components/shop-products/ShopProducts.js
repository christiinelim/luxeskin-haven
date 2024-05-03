import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';
import { SellerContext } from '../../context/SellerContext';
import SortProducts from './SortProducts';
import FilterProducts from './FilterProducts';
import styles from './styles.module.css';

const ShopProducts = () => {
    const location = useLocation();
    const isSearchPage = location.pathname === '/shop/search-product/';
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();

    const productContext = useContext(ProductContext);
    const cartContext = useContext(CartContext);
    const sellerContext = useContext(SellerContext);

    const [ products, setProducts ] = useState(null);
    const [ addedProductId, setAddedProductId ] = useState(null);
    const [ insufficient, setInsufficient ] = useState(false);
    const [ showSort, setShowSort ] = useState(false);
    const [ showFilter, setShowFilter ] = useState(false);
    const [ emptySearch, setEmptySearch ] = useState(false);
    const [ searchedProduct, setSearchedProduct ] = useState("");
    const [ sellers, setSellers ] = useState({});

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                if (isSearchPage) {
                    let searchTerm;
                    let searchResult;

                    if (searchParams.get('product')) {
                        searchTerm = searchParams.get('product').split('-').join(' ');
                        searchResult = await productContext.searchProducts({
                            name: searchTerm
                        });
                    } else {
                        searchTerm = parseInt(searchParams.get('category'));
                        searchResult = await productContext.searchProducts({
                            selectedCategories: [searchTerm]
                        });
                    }
                    setSearchedProduct(searchTerm);

                    if (searchResult.data.length === 0) {
                        setEmptySearch(true);
                    }
                    setProducts(searchResult.data);
                } else {
                    if (!productContext.loading) {
                        setProducts(productContext.products);
                    }
                }

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
        
    }, [isSearchPage, searchParams, productContext.loading]);

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

    return (
        <>
            { showFilter && <div className="overlay"></div> }
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

                { showSort && <SortProducts products={ products } setProducts={ setProducts } /> }

                { showFilter &&
                    <FilterProducts showFilter={ showFilter} setShowFilter={ setShowFilter } sellers={ sellers }
                                    setProducts={ setProducts } setEmptySearch = { setEmptySearch }
                                    searchedProduct={ searchedProduct }
                    />
                }

                { emptySearch && <div className={styles['empty-search']}>No products found!</div> }

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