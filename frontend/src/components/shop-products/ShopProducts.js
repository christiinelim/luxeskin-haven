import React, { useState, useContext, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { SellerContext } from '../../context/SellerContext';
import SortProducts from './SortProducts';
import FilterProducts from './FilterProducts';
import styles from './styles.module.css';
import ProductCards from '../shared/product-cards/ProductCards';

const ShopProducts = () => {
    const location = useLocation();
    const isSearchPage = location.pathname === '/shop/search-product/';
    const [ searchParams ] = useSearchParams();

    const productContext = useContext(ProductContext);
    const sellerContext = useContext(SellerContext);

    const [ products, setProducts ] = useState(null);
    const [ showSort, setShowSort ] = useState(false);
    const [ showFilter, setShowFilter ] = useState(false);
    const [ filtered, setFiltered ] = useState(false);
    const [ emptySearch, setEmptySearch ] = useState(false);
    const [ searchedProduct, setSearchedProduct ] = useState("");
    const [ sellers, setSellers ] = useState({});
    const [ currentPage, setCurrentPage ] = useState(1);

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
                        productContext.getProductsByPage(currentPage);
                        setProducts(productContext.productPage[`page` + currentPage]);
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
        
    }, [isSearchPage, searchParams, productContext.loading, currentPage, productContext.productPage]);

    const handleSortButton = () => {
        setShowSort(!showSort)
    }

    const handleFilterButton = () => {
        setShowFilter(!showFilter)
    }

    const handleClearFilterButton = () => {
        setFiltered(false);
        setProducts(productContext.productPage['page1'])
    }

    return (
        <>
            { showFilter && <div className="overlay"></div> }
            <div className='shop-wrapper'>
                <div className='page-header'>Shop Products</div>
                <div className={styles['sort-filter-wrapper']}>
                    { filtered &&
                        <div className={styles['sort-filter-button']} onClick={ handleClearFilterButton }>
                            <div>
                                <i className={`bi bi-x-lg ${styles['sort-filter-icon']}`}></i>
                            </div>
                            <div>Clear Filter</div>
                        </div>
                    }
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
                                    setProducts={ setProducts } setEmptySearch={ setEmptySearch }
                                    searchedProduct={ searchedProduct } setFiltered={ setFiltered }
                    />
                }

                { emptySearch && <div className={styles['empty-search']}>No products found!</div> }

                { products && (
                    <div className={styles['products-wrapper']}>
                        <ProductCards products={ products }/>
                    </div>
                )}

                { !filtered && productContext.pages && (
                    <div className={styles['pagination-wrapper']}>
                        {(() => {
                            const pagination = [];
                            for (let page = 1; page <= productContext.pages; page++) {
                                pagination.push(
                                    <div
                                        key={page}
                                        className={`${styles['page']} ${currentPage === page ? styles['active-page'] : ''}`}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </div>
                                );
                            }
                            return pagination;
                        })()}
                    </div>
                )}
            </div>
        </>
    )
}

export default ShopProducts;