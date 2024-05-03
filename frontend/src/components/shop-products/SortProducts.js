import React, { useState } from 'react';
import styles from './styles.module.css';

const SortProducts = ({ products, setProducts }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [sortedProducts, setSortedProducts] = useState({});

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSortChange(selectedOption); 
    }

    const handleSortChange = (selectedOption) => {
        if (sortedProducts[selectedOption]) {
            setProducts(sortedProducts[selectedOption]);
        } else {
            console.log('sorting')
            let sortedResult = [...products]; 
            switch (selectedOption) {
                case 'newest':
                    sortedResult.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    break;
                case 'oldest':
                    sortedResult.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                    break;
                case 'expensive':
                    sortedResult.sort((a, b) => b.cost - a.cost);
                    break;
                case 'cheap':
                    sortedResult.sort((a, b) => a.cost - b.cost);
                    break;
                case 'a':
                    sortedResult.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'z':
                    sortedResult.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                default:
                    break;
            }
            setProducts(sortedResult);
            setSortedProducts({ ...sortedProducts, [selectedOption]: sortedResult });
        }
    } 

    return (
        <form onSubmit={ handleSubmit }>
            <div className={styles['sort-checkboxes-wrapper']} onChange={ handleChange }>
                <div>
                    <div>
                        <input type='radio' name='sortOption' value='newest' className={styles['sort-checkbox']} checked={ selectedOption === 'newest' } />
                        <label>Newest</label>
                    </div>
                    <div>
                        <input type='radio' name='sortOption' value='oldest' className={styles['sort-checkbox']} checked={ selectedOption === 'oldest' } />
                        <label>Oldest</label>
                    </div>
                    <div>
                        <input type='radio' name='sortOption' value='expensive' className={styles['sort-checkbox']} checked={ selectedOption === 'expensive' } />
                        <label>Price (Highest to Lowest)</label>
                    </div>
                    <div>
                        <input type='radio' name='sortOption' value='cheap' className={styles['sort-checkbox']} checked={ selectedOption === 'cheap' } />
                        <label>Price (Lowest to Highest)</label>
                    </div>
                    <div>
                        <input type='radio' name='sortOption' value='a' className={styles['sort-checkbox']} checked={ selectedOption === 'a' } />
                        <label>A - Z</label>
                    </div>
                    <div>
                        <input type='radio' name='sortOption' value='z' className={styles['sort-checkbox']} checked={ selectedOption === 'z' } />
                        <label>Z - A</label>
                    </div>
                </div>
                <div className={styles['sort-button-wrapper']}>
                    <button type="submit" id={styles['sort-button']} className="button-full">
                        Sort
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SortProducts;
