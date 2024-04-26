import React, { useState, useContext, useEffect } from 'react';
import { SellerContext } from '../../../context/SellerContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../context/AuthContext';
import UploadWidget from '../../shared/UploadWidget';

const SellerProfile = () => {
    const { sellerId } = useParams();
    const navigate = useNavigate();
    const sellerContext = useContext(SellerContext);
    const authContext = useContext(AuthContext);
    const { register, handleSubmit, setError, getValues, setValue, formState: { errors, isSubmitting } } = useForm();
    const [ seller, setSeller ] = useState(null);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ isDeleting, setIsDeleting ] = useState(false);
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ imageUrl, setImageUrl ] = useState("");

    useEffect(() => {
        
        const fetchData = async() => {
            try {
                const response = await sellerContext.getSeller(sellerId);

                if (response.error === "Unauthorized, please login") {
                    navigate('/seller/login', { 
                        state: { 
                            error_message: "Unauthorized, please login to access"
                        }
                    });
                } else {
                    const seller = response.data;
                    setSeller(seller);
                    setValue("username", seller.username);
                    setValue("email", seller.email);
                    setValue("contact", seller.contact);
                    setValue("instagram", seller.instagram);
                    setValue("tiktok", seller.tiktok);
                    setValue("website", seller.website);
                }
            } catch (error) {
                navigate('/seller/login', { 
                    state: { 
                        error_message: "Unauthorized, please login to access"
                    }
                });
            }
        }

        fetchData();
        
    }, [sellerId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, '0'); 
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear().toString(); 

        return `${day}-${month}-${year}`;
    };

    const handleImageUpload = (url) => {
        setImageUrl(url);
    };

    const handleCancelUpdate = () => {
        setIsEditing(false);
        setImageUrl("");
    }

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            delete data.confirm_password;
            data.image = imageUrl;

            const response = await sellerContext.updateProfile(seller.id, data); 
            const updatedSellerData = response.data;

            setSeller(seller => ({
                ...seller,
                username: updatedSellerData.username,
                email: updatedSellerData.email,
                contact: updatedSellerData.contact,
                instagram: updatedSellerData.instagram,
                tiktok: updatedSellerData.tiktok,
                website: updatedSellerData.website,
                image: imageUrl
            }));
            
            setIsEditing(false);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);
        } catch (error) {
            console.log(error)
            setError("root", {
                message: "Error updating profile"
            })
        }
    };

    const handleDeleteAccountClick = async (sellerId) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await sellerContext.deleteSeller(seller.id); 
            authContext.logout();
            navigate('/seller/login', { 
                state: { 
                    success_message: "Your account has been deleted"
                }
            });
        } catch (error) {
            setError("root", {
                message: "Error deleting account"
            })
        }
    }

    return (
            seller && 
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="profile-wrapper">
                    <div>
                        <div className='picture-section'>
                            { !seller.image && (
                                ( !imageUrl && <i className="bi bi-person-circle profile-picture"></i> ) ||
                                ( isEditing && imageUrl && <img src={ imageUrl } className='profile-image'/> )
                            )}
                            { seller.image && (
                                ( !imageUrl && <img src={ seller.image } className='profile-image'/> ) ||
                                ( isEditing && imageUrl && <img src={ imageUrl } className='profile-image'/> )
                            )}
                            {/* { isEditing && imageUrl &&
                                <img src={ imageUrl } className='profile-image'/>
                            } */}
                            { isEditing && 
                                <UploadWidget onImageUpload={ handleImageUpload }></UploadWidget>
                            }
                        </div>
                        <div className='profile-details-section row'>
                            <div className='col-12 col-md-6 section-items'>
                                <div className='section-header'>General</div>
                                <div className='profile-details-items'>
                                    <div className='section-icon'><i className="bi bi-person details-icon"></i></div>
                                    <div>
                                        <div className='section-details-header'>Username</div>
                                        { !isEditing && <div>{ seller.username }</div> }
                                        { isEditing && <input {...register("username", {
                                            required: "Username is required"
                                        })} type="text" id="username" name="username" className="profile-input" /> }
                                        { isEditing && errors.username && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.username.message }</div> }
                                    </div>
                                </div>
                                <div className='profile-details-items'>
                                    <div className='section-icon'><i className="bi bi-envelope-at details-icon"></i></div>
                                    <div>
                                        <div className='section-details-header'>Email</div>
                                        { !isEditing && <div>{ seller.email }</div> }
                                        { isEditing && <input {...register("email", {
                                            required: "Email is required",
                                            maxLength: 320,
                                            validate: (value) => value.includes("@") || "Invalid format, email must include @"
                                        })} type="text" id="email" name="email" className="profile-input" /> }
                                        { isEditing && errors.email && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.email.message }</div> }
                                    </div>
                                </div>
                                <div className='profile-details-items'>
                                    <div className='section-icon'><i className="bi bi-key details-icon"></i></div>
                                    <div>
                                        <div className='section-details-header'>Password</div>
                                        { !isEditing && <div>••••••••</div> }
                                        { isEditing && <input {...register("password", {
                                            required: "Password is required",
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}$/,
                                                message: "Password must be 8-32 characters, contain 1 uppercase, lowercase, number and special character"
                                            }
                                        })} type="password" id="password" name="password" className="profile-input" /> }
                                        { isEditing && errors.password && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.password.message }</div> }
                                    </div>
                                </div>
                                
                                { isEditing && 
                                    <div className='profile-details-items'>
                                        <div className='section-icon'><i className="bi bi-key details-icon"></i></div>
                                        <div>
                                            <div className='section-details-header'>Confirm Password</div>
                                            <input {...register("confirm_password", {
                                                required: "Input is required",
                                                validate: (value) => value === getValues('password') || "Passwords do not match"
                                            })} type="password" id="confirm_password" name="confirm_password" className="profile-input" />
                                            { errors.confirm_password && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.confirm_password.message }</div> }
                                        </div>
                                    </div>
                                }

                                <div className='profile-details-items'>
                                    <div className='section-icon'><i className="bi bi-calendar3 details-icon"></i></div>
                                    <div>
                                        <div className='section-details-header'>Date Joined</div>
                                        <div>{ formatDate(seller.created_at) }</div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6 section-items'>
                                <div className='section-header'>Contact</div>
                                <div className='profile-details-items'>
                                    <div className='section-icon'><i className="bi bi-telephone-inbound details-icon"></i></div>
                                    <div>
                                        <div className='section-details-header'>Contact Number</div>
                                        { !isEditing && <div>{ seller.contact }</div> }
                                        { isEditing && <input {...register("contact", {
                                            required: "Contact is required",
                                            pattern: {
                                                value: /^[689]\d{7}$/,
                                                message: "Contact must be 8 numbers, starting with 6, 8 or 9"
                                            }
                                        })} type="number" id="contact" name="contact" className="profile-input" /> }
                                        { isEditing && errors.contact && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.contact.message }</div> }
                                    </div>
                                </div>
                                <div className='profile-details-items'>
                                    <div className='section-icon'><i className="bi bi-instagram details-icon"></i></div>
                                    <div>
                                        <div className='section-details-header'>Instagram</div>
                                        { !isEditing && <div>{ seller.instagram }</div> }
                                        { isEditing && <input {...register("instagram", {
                                            required: "Instagram is required"
                                        })} type="text" id="instagram" name="instagram" className="profile-input" /> }
                                        { isEditing && errors.instagram && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.instagram.message }</div> }
                                    </div>
                                </div>
                                <div className='profile-details-items'>
                                    <div className='section-icon'><i className="bi bi-tiktok details-icon"></i></div>
                                    <div>
                                        <div className='section-details-header'>TikTok</div>
                                        { !isEditing && <div>{ seller.tiktok }</div> }
                                        { isEditing && <input {...register("tiktok", {
                                            required: "TikTok is required"
                                        })} type="text" id="tiktok" name="tiktok" className="profile-input" /> }
                                        { isEditing && errors.tiktok && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.tiktok.message }</div> }
                                    </div>
                                </div>
                                <div className='profile-details-items'>
                                    <div className='section-icon'><i className="bi bi-globe details-icon"></i></div>
                                    <div>
                                        <div className='section-details-header'>Website</div>
                                        { !isEditing && <div>{ seller.website }</div> }
                                        { isEditing && <input {...register("website", {
                                            required: "Website is required"
                                        })} type="text" id="website" name="website" className="profile-input" /> }
                                        { isEditing && errors.website && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.website.message }</div> }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='profile-update-error'>
                            { isEditing && errors.root && <div className="form-message form-error-box"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.root.message }</div> }
                            { isSuccess && <div className="form-message form-success-box"><i className="bi bi-check-circle form-icon"></i>Profile has been updated</div> }
                        </div>
                        <div className='update-button-div'>
                            { !isEditing && 
                                <>
                                    <div className="button-full update-button" onClick={ () => setIsEditing(true) }>Update Profile</div> 
                                    <div className="button-full delete-button" onClick={ () => setIsDeleting(true) }>Delete Account</div> 
                                </>
                            }
                            { isEditing && 
                                <>
                                    <div className="button-border cancel-button" onClick={ handleCancelUpdate }>Cancel</div> 
                                    <button disabled={ isSubmitting } type="submit" className="button-full update-button">
                                        { isSubmitting ? "Updating" : "Update" }
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                    { isDeleting && 
                        <div className='overlay delete-account-up'>
                            <div className='delete-account-content'>
                                <div className='delete-header'>Delete Account</div>
                                <div>Are you sure you want to delete <span className='delete-item'>{ seller.username }</span>?</div>
                                <div className='warning-content-container'>
                                    <div className="warning-side"></div>
                                    <div className='warning-content'>
                                        <div className='warning-header-content'>
                                            <div><i className="bi bi-exclamation-triangle-fill warning-icon"></i></div>
                                            <div className='warning-header'>Warning</div>
                                        </div>
                                        <div className='warning-description'>By deleting this account, you will lose all your current listings and no longer have access to your account</div>
                                    </div>
                                </div>
                                <div className='warning-action'>
                                    <button className="button-border warning-action-cancel" onClick={ () => setIsDeleting(false) }>Cancel</button> 
                                    <button className="button-full" onClick={ () => handleDeleteAccountClick(seller.id) }>Confirm</button> 
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </form>
    )
}

export default SellerProfile;