import React, { useState } from 'react';
import styles from './styles.module.css';

const SortProducts = () => {

    return (
        <>
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
        </>
    )
}

export default SortProducts;