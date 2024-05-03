import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowRight } from 'react-bootstrap-icons';
import { ProductContext } from '../../../context/ProductContext';
import styles from './styles.module.css';

const NavSearchForm = ({ showSearchBar }) => {
    const navigate = useNavigate();
    const productContext = useContext(ProductContext);
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [ search, setSearch ] = useState("");
    const [ searchResults, setSearchResults ] = useState([]);

    useEffect(() => {
        const searchProducts = async () => {
            if (search) {
                const results = await productContext.searchProducts({
                    name: search
                });
                setSearchResults(results.data); 
            } else {
                setSearchResults(''); 
            }
        };

        searchProducts();
    }, [search]); 

    const onSubmit = async (data) => {
        try {
            const param = data.product.split(' ').join('-');
            navigate('/shop/search-product/?product=' + param);
        } catch (error) {
            setError("root", {
                message: "Error updating profile"
            })
        }
    };

    return (
        <div className={`${styles['searchbar']} ${showSearchBar ? styles['searchbar-open'] : ''}`}>
            <div className={styles['search-prompt']}>Have a particular product in mind?</div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles['searchbox']}>
                <div>
                    <input {...register("product", {
                            required: "Search input is required"
                        })} type="text" id="product" name="product" 
                        value={ search }
                        onChange={ (e) => setSearch(e.target.value) }
                    />
                </div>
                <button type='submit'><ArrowRight /></button>
                { errors.root && <div className="form-message form-error-box"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.root.message }</div> }
            </form>
            { errors.product && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.product.message }</div> }
            { searchResults.length!== 0 && (
                <div className={styles['autocomplete-dropdown']}>
                    { searchResults.map((product) => (
                        <div key={product.id} className={styles['autocomplete-items']} onClick={ () => setSearch(product.name) }>{product.name}</div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NavSearchForm