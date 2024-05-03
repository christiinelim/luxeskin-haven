import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../../context/ProductContext';
import UploadWidget from '../../shared/upload-widget/UploadWidget';
import styles from './styles.module.css';

const SellerListProduct = () => {
    const productContext = useContext(ProductContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { mode } = location.state;
    const [ imageUrl, setImageUrl ] = useState("");
    const [ productToUpdate, setProductToUpdate ] = useState({});
    const [ selectedSkinTypes, setSelectedSkinTypes ] = useState([]);
    const { register, handleSubmit, setError, setValue, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        
        const fetchData = async() => {
            try {
                if (mode === "Update") {
                    const { productId } = location.state;
                    const selectedProduct = await productContext.getProductById(productId);
                    const productData = selectedProduct.data;
                    setProductToUpdate(productData);
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
        
    }, []);

    useEffect(() => {
        if (productToUpdate) {
            setValue("name", productToUpdate.name);
            setValue("category_id", productToUpdate.category_id);
            setValue("cost", productToUpdate.cost);
            setValue("stocks_on_hand", productToUpdate.stocks_on_hand);
            setValue("ingredients", productToUpdate.ingredients);
            setValue("description", productToUpdate.description);
            setValue("refund_policy", productToUpdate.refund_policy);

            if (productToUpdate && productToUpdate.skin_types) {
                const skinTypeIds = productToUpdate.skin_types.map(type => type.id);
                setSelectedSkinTypes(skinTypeIds);
            }

            setImageUrl(productToUpdate.image);
        }
    }, [productToUpdate, setValue]);

    const handleSkinTypeClick = (id) => {
        setSelectedSkinTypes(prevSelectedSkinTypes => {
            if (prevSelectedSkinTypes.includes(id)) {
                return prevSelectedSkinTypes.filter(typeId => typeId !== id);
            } else {
                return [...prevSelectedSkinTypes, id];
            }
        });
    };

    const getBackgroundColorForSkinType = (skinType) => {
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

    const onSubmit = async (data) => {
        if (!imageUrl) {
            setError("image", {
                type: "manual",
                message: "Product image is required"
            });
            return;
        }

        if (selectedSkinTypes.length === 0) {
            setError("skin_types", {
                type: "manual",
                message: "Skin types is required"
            });
            return;
        }

        try {
            data.category_id = parseInt(data.category_id);
            data.cost = parseFloat(data.cost);
            data.stocks_on_hand = parseInt(data.stocks_on_hand);
            
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const newProduct = {
                ...data,
                seller_id: parseInt(localStorage.getItem("sellerId")),
                image: imageUrl,
                skin_types: selectedSkinTypes.join(',')
            }

            if (mode === "Add") {
                await productContext.createProduct(newProduct); 
            } else {
                console.log(newProduct)
                await productContext.updateProduct(productToUpdate.id, newProduct); 
            }
            
            navigate('/listings')
        } catch (error) {
            console.log(error)
            setError("root", {
                message: "Error listing product"
            })
        }
    };

    const handleImageUpload = (url) => {
        setImageUrl(url);
    };

    return (
        <div className={styles['add-product-form-wrapper']}>
            <div className='page-header'>{ mode === "Add" ? "Add New Product" : "Update Product" }</div>
            <form onSubmit={handleSubmit(onSubmit)} className={`form-container ${styles['add-product-form']}`}>
                <div>
                    <label>Name of Product</label>
                    <input {...register("name", {
                        required: "Name of product is required"
                    })} type="text" id="name" name="name" />
                    { errors.name && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.name.message }</div> }
                </div>

                <div>
                    <label>Upload Image</label>
                    <UploadWidget onImageUpload={ handleImageUpload }></UploadWidget>
                    { imageUrl && <img src={ imageUrl } className={styles['add-product-image']} /> }
                    { errors.image && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.image.message }</div> }
                </div>

                <div>
                    <label>Category</label>
                    <select id="category_id" {...register('category_id')} className={styles['category-select']}>
                        {productContext.categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.category}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Suitable Skin Types</label>
                    <div className={styles['skin-type-options']}>
                        {productContext.skinTypes.map(type => (
                            <div
                                key={type.id}
                                className={`${styles['skin-type-option']} ${selectedSkinTypes.includes(type.id) ? styles['selected-skin-type'] : ''}`}
                                style={{ backgroundColor: selectedSkinTypes.includes(type.id) ? getBackgroundColorForSkinType(type.skin_type) : 'transparent' }}
                                onClick={() => handleSkinTypeClick(type.id)}
                            >
                                {type.skin_type}
                            </div>
                        ))}
                    </div>
                    { errors.skin_types && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.skin_types.message }</div> }
                </div>

                <div className="input-half-width">
                    <div className="input-half-width-items">
                        <label>Cost</label>
                        <input {...register("cost", {
                            required: "Cost is required",
                        })} type="number" id="cost" name="cost" step="0.01" min="0"/>
                        { errors.cost && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.cost.message }</div> }
                    </div>

                    <div className="input-half-width-items">
                        <label>Available Stocks</label>
                        <input {...register("stocks_on_hand", {
                            required: "Available stocks is required",
                        })} type="number" id="stocks_on_hand" name="stocks_on_hand" min="0"/>
                        { errors.stocks_on_hand && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.stocks_on_hand.message }</div> }
                    </div>
                </div>

                <div>
                    <label>Ingredients</label>
                    <input {...register("ingredients", {
                        required: "Ingredients is required"
                    })} type="textarea" id="ingredients" name="ingredients" className={styles['textarea-input']}/>
                    { errors.ingredients && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.ingredients.message }</div> }
                </div>

                <div>
                    <label>Product Description</label>
                    <input {...register("description", {
                        required: "Product's description is required"
                    })} type="textarea" id="description" name="description" className={styles['textarea-input']}/>
                    { errors.description && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.description.message }</div> }
                </div>

                <div>
                    <label>Refund Policy</label>
                    <input {...register("refund_policy", {
                        required: "Refund policy is required"
                    })} type="textarea" id="refund_policy" name="refund_policy" className={styles['textarea-input']}/>
                    { errors.refund_policy && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.refund_policy.message }</div> }
                </div>

                <div className="submit-button-container">
                    <button disabled={ isSubmitting } type="submit" className="button-full submit-button">
                        { isSubmitting ? "Loading" : mode === "Add" ? "Add Product" : "Update Product" }
                    </button>
                </div>
                { errors.root && <div className="form-message form-error-box"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.root.message }</div> }
            </form>
        </div>
    );
}

export default SellerListProduct;