import React, { useState, useContext, useEffect } from 'react';
import { SellerContext } from '../../../context/SellerContext';
import { AuthContext } from '../../../context/AuthContext';
import { UserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import UploadWidget from '../upload-widget/UploadWidget';
import DeleteWarning from '../delete-warning/DeleteWarning';
import styles from './styles.module.css';

const ProfileForm = ({ formType, id }) => {
    const navigate = useNavigate();
    const sellerContext = useContext(SellerContext);
    const userContext = useContext(UserContext);
    const authContext = useContext(AuthContext);
    const { register, handleSubmit, setError, getValues, setValue, formState: { errors, isSubmitting } } = useForm();
    const [ profile, setProfile ] = useState(null);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ isDeleting, setIsDeleting ] = useState(false);
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ imageUrl, setImageUrl ] = useState("");

    useEffect(() => {
        
        const fetchData = async() => {
            try {
                let response;
                if (formType === "seller") {
                    response = await sellerContext.getSeller(id);
                } else {
                    response = await userContext.getUser(id);
                }
                
                if (response.error === "Unauthorized, please login") {
                    handleNavigate({ 
                        error_message: "Unauthorized, please login to access"
                    });
                } else {
                    const profile = response.data;
                    setProfile(profile);
                    setValue("username", profile.username);
                    setValue("email", profile.email);
                    setValue("contact", profile.contact);

                    if (formType === "seller") {
                        setValue("instagram", profile.instagram);
                        setValue("tiktok", profile.tiktok);
                        setValue("website", profile.website);
                    } else {
                        setValue("first_name", profile.first_name);
                        setValue("last_name", profile.last_name);
                        setValue("address", profile.address);
                    }
                    
                }
            } catch (error) {
                handleNavigate({ 
                    error_message: "Unauthorized, please login to access"
                });
            }
        }

        fetchData();
        
    }, [id]);

    const handleNavigate = (message) => {
        if (formType === "seller") {
            navigate('/seller/login', { 
                state: message
            });
        } else {
            navigate('/login', { 
                state: message
            });
        }
    }

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
    };

    const handleDeleteClick = async (id) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (formType === "seller") {
                await sellerContext.deleteSeller(id); 
                authContext.logout("seller");
            } else {
                await userContext.deleteUser(id); 
                authContext.logout("user");
            }
            
            handleNavigate({ 
                success_message: "Your account has been deleted"
            });
        } catch (error) {
            setError("root", {
                message: "Error deleting account"
            })
        }
    }

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            delete data.confirm_password;
            data.image = imageUrl !== "" ? imageUrl : profile.image;
            let response;

            if (formType === "seller") {
                response = await sellerContext.updateProfile(profile.id, data); 
                const updatedProfileData = response.data;
                setProfile(updatedProfileData);
            } else {
                response = await userContext.updateProfile(profile.id, data); 
                const updatedProfileData = response.data;
                setProfile(updatedProfileData);
            }

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

    return (
            profile && 
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles['profile-wrapper']}>
                    <div>
                        <div className={styles['picture-section']}>
                            { !profile.image && (
                                ( !imageUrl && <i className={`bi bi-person-circle ${styles['profile-picture']}`}></i> ) ||
                                ( isEditing && imageUrl && <img src={ imageUrl } className={styles['profile-image']}/> )
                            )}
                            { profile.image && (
                                ( !imageUrl && <img src={ profile.image } className={styles['profile-image']}/> ) ||
                                ( isEditing && imageUrl && <img src={ imageUrl } className={styles['profile-image']}/> )
                            )}
                            { isEditing && 
                                <UploadWidget onImageUpload={ handleImageUpload }></UploadWidget>
                            }
                        </div>
                        <div className={`row ${styles['profile-details-section']}`}>
                            <div className={`col-12 col-md-6 ${styles['section-items']}`}>
                                <div className={styles['section-header']}>General</div>
                                <div className={styles['profile-details-items']}>
                                    <div className={styles['section-icon']}>
                                        <i className={`bi bi-person ${styles['details-icon']}`}></i>
                                    </div>
                                    <div>
                                        <div className={styles['section-details-header']}>Username</div>
                                        { !isEditing && <div>{ profile.username }</div> }
                                        { isEditing && <input {...register("username", {
                                            required: "Username is required"
                                        })} type="text" id="username" name="username" className={styles['profile-input']} /> }
                                        { isEditing && errors.username && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.username.message }</div> }
                                    </div>
                                </div>
                                <div className={styles['profile-details-items']}>
                                    <div className={styles['section-icon']}>
                                        <i className={`bi bi-envelope-at ${styles['details-icon']}`}></i>
                                    </div>
                                    <div>
                                        <div className={styles['section-details-header']}>Email</div>
                                        { !isEditing && <div>{ profile.email }</div> }
                                        { isEditing && <input {...register("email", {
                                            required: "Email is required",
                                            maxLength: 320,
                                            validate: (value) => value.includes("@") || "Invalid format, email must include @"
                                        })} type="text" id="email" name="email" className={styles['profile-input']} /> }
                                        { isEditing && errors.email && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.email.message }</div> }
                                    </div>
                                </div>
                                <div className={styles['profile-details-items']}>
                                    <div className={styles['section-icon']}>
                                        <i className={`bi bi-key ${styles['details-icon']}`}></i>
                                    </div>
                                    <div>
                                        <div className={styles['section-details-header']}>Password</div>
                                        { !isEditing && <div>••••••••</div> }
                                        { isEditing && <input {...register("password", {
                                            required: "Password is required",
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}$/,
                                                message: "Password must be 8-32 characters, contain 1 uppercase, lowercase, number and special character"
                                            }
                                        })} type="password" id="password" name="password" className={styles['profile-input']} /> }
                                        { isEditing && errors.password && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.password.message }</div> }
                                    </div>
                                </div>
                                
                                { isEditing && 
                                    <div className={styles['profile-details-items']}>
                                        <div className={styles['section-icon']}>
                                            <i className={`bi bi-key ${styles['details-icon']}`}></i>
                                        </div>
                                        <div>
                                            <div className={styles['section-details-header']}>Confirm Password</div>
                                            <input {...register("confirm_password", {
                                                required: "Input is required",
                                                validate: (value) => value === getValues('password') || "Passwords do not match"
                                            })} type="password" id="confirm_password" name="confirm_password" className={styles['profile-input']} />
                                            { errors.confirm_password && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.confirm_password.message }</div> }
                                        </div>
                                    </div>
                                }

                                <div className={styles['profile-details-items']}>
                                    <div className={styles['section-icon']}>
                                        <i className={`bi bi-calendar3 ${styles['details-icon']}`}></i>
                                    </div>
                                    <div>
                                        <div className={styles['section-details-header']}>Date Joined</div>
                                        <div>{ formatDate(profile.created_at) }</div>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-12 col-md-6 ${styles['section-items']}`}>
                                <div className={styles['section-header']}>Contact</div>
                                <div className={styles['profile-details-items']}>
                                    <div className={styles['section-icon']}>
                                        <i className={`bi bi-telephone-inbound ${styles['details-icon']}`}></i>
                                    </div>
                                    <div>
                                        <div className={styles['section-details-header']}>Contact Number</div>
                                        { !isEditing && <div>{ profile.contact }</div> }
                                        { isEditing && <input {...register("contact", {
                                            required: "Contact is required",
                                            pattern: {
                                                value: /^[689]\d{7}$/,
                                                message: "Contact must be 8 numbers, starting with 6, 8 or 9"
                                            }
                                        })} type="number" id="contact" name="contact" className={styles['profile-input']} /> }
                                        { isEditing && errors.contact && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.contact.message }</div> }
                                    </div>
                                </div>
                                { formType === "seller" ? ( 
                                    <>
                                        <div className={styles['profile-details-items']}>
                                            <div className={styles['section-icon']}>
                                                <i className={`bi bi-instagram ${styles['details-icon']}`}></i>
                                            </div>
                                            <div>
                                                <div className={styles['section-details-header']}>Instagram</div>
                                                { !isEditing && <div>{ profile.instagram }</div> }
                                                { isEditing && <input {...register("instagram", {
                                                    required: "Instagram is required"
                                                })} type="text" id="instagram" name="instagram" className={styles['profile-input']} /> }
                                                { isEditing && errors.instagram && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.instagram.message }</div> }
                                            </div>
                                        </div>
                                        <div className={styles['profile-details-items']}>
                                            <div className={styles['section-icon']}>
                                                <i className={`bi bi-tiktok ${styles['details-icon']}`}></i>
                                            </div>
                                            <div>
                                                <div className={styles['section-details-header']}>TikTok</div>
                                                { !isEditing && <div>{ profile.tiktok }</div> }
                                                { isEditing && <input {...register("tiktok", {
                                                    required: "TikTok is required"
                                                })} type="text" id="tiktok" name="tiktok" className={styles['profile-input']} /> }
                                                { isEditing && errors.tiktok && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.tiktok.message }</div> }
                                            </div>
                                        </div>
                                        <div className={styles['profile-details-items']}>
                                            <div className={styles['section-icon']}>
                                                <i className={`bi bi-globe ${styles['details-icon']}`}></i>
                                            </div>
                                            <div>
                                                <div className={styles['section-details-header']}>Website</div>
                                                { !isEditing && <div>{ profile.website }</div> }
                                                { isEditing && <input {...register("website", {
                                                    required: "Website is required"
                                                })} type="text" id="website" name="website" className={styles['profile-input']} /> }
                                                { isEditing && errors.website && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.website.message }</div> }
                                            </div>
                                        </div> 
                                    </>
                                    ) :
                                    <>
                                        <div className={styles['profile-details-items']}>
                                            <div className={styles['section-icon']}>
                                                <i className={`bi bi-person ${styles['details-icon']}`}></i>
                                            </div>
                                            <div>
                                                <div className={styles['section-details-header']}>First Name</div>
                                                { !isEditing && <div>{ profile.first_name }</div> }
                                                { isEditing && <input {...register("first_name", {
                                                    required: "First name is required"
                                                })} type="text" id="first_name" name="first_name" className={styles['profile-input']} /> }
                                                { isEditing && errors.first_name && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.first_name.message }</div> }
                                            </div>
                                        </div>
                                        <div className={styles['profile-details-items']}>
                                            <div className={styles['section-icon']}>
                                                <i className={`bi bi-person ${styles['details-icon']}`}></i>
                                            </div>
                                            <div>
                                                <div className={styles['section-details-header']}>Last Name</div>
                                                { !isEditing && <div>{ profile.last_name }</div> }
                                                { isEditing && <input {...register("last_name", {
                                                    required: "Last name is required"
                                                })} type="text" id="last_name" name="last_name" className={styles['profile-input']} /> }
                                                { isEditing && errors.last_name && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.last_name.message }</div> }
                                            </div>
                                        </div>
                                        <div className={styles['profile-details-items']}>
                                            <div className={styles['section-icon']}>
                                                <i className={`bi bi-person ${styles['details-icon']}`}></i>
                                            </div>
                                            <div>
                                                <div className={styles['section-details-header']}>Address</div>
                                                { !isEditing && <div>{ profile.address }</div> }
                                                { isEditing && <input {...register("address", {
                                                    required: "Address is required"
                                                })} type="text" id="address" name="address" className={styles['profile-input']} /> }
                                                { isEditing && errors.address && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.address.message }</div> }
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                        <div className={styles['profile-update-error']}>
                            { isEditing && errors.root && <div className="form-message form-error-box"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.root.message }</div> }
                            { isSuccess && <div className="form-message form-success-box"><i className="bi bi-check-circle form-icon"></i>Profile has been updated</div> }
                        </div>
                        <div className={styles['update-button-div']}>
                            { !isEditing && 
                                <>
                                    <div id={styles['update-button']} className="button-full" onClick={ () => setIsEditing(true) }>Update Profile</div> 
                                    <div id={styles['delete-button']} className="button-full" onClick={ () => setIsDeleting(true) }>Delete Account</div> 
                                </>
                            }
                            { isEditing && 
                                <>
                                    <div id={styles['cancel-button']} className="button-border" onClick={ handleCancelUpdate }>Cancel</div> 
                                    <button disabled={ isSubmitting } type="submit" id={styles['update-button']} className="button-full">
                                        { isSubmitting ? "Updating" : "Update" }
                                    </button>
                                </>
                            }
                        </div>
                    </div>

                    { isDeleting && 
                        <DeleteWarning item = { profile.username } 
                                        itemId = { profile.id } 
                                        setIsDeleting = { setIsDeleting } 
                                        handleDeleteClick = { handleDeleteClick } 
                                        message = { formType === "seller" ?
                                                    "By deleting this account, you will lose all your current listings and no longer have access to your account" :
                                                    "By deleting this account, you will lose all your purchase history and no longer be able to make future purchases"
                                                }
                        />
                    }
                </div>
            </form>
    )
}

export default ProfileForm;