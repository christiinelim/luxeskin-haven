import React, { useState, useContext, useEffect } from 'react';
import { SellerServicesContext } from '../../../context/SellerServicesContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const SellerProfile = () => {
    const { sellerId } = useParams();
    const navigate = useNavigate();
    const sellerContext = useContext(SellerServicesContext);
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();
    const [ seller, setSeller ] = useState(null);
    const [ isEditing, setIsEditing ] = useState(false);

    useEffect(() => {
        
        const fetchData = async() => {
            const response = await sellerContext.getSeller(sellerId);

            if (response.error === "Unauthorized, please login") {
                navigate('/seller/login', { 
                    state: { 
                        error_message: "Unauthorized, please login to access"
                    }
                });
            }
            setSeller(response.data)
        }

        fetchData();
        
    }, [sellerId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, '0'); 
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear().toString(); 

        return `${day}-${month}-${year}`;
    }

    console.log(seller);

    return (
            seller && 
            <form>
                <div className="profile-wrapper">
                    <div>
                        <div className='picture-section'>
                            <i className="bi bi-person-circle profile-picture"></i>
                        </div>
                        <div className='profile-details-section'>
                            <div className='section-items'>
                                <div className='section-header'>General</div>
                                <div className='profile-details-items'>
                                    <div className='section-icon'><i className="bi bi-person details-icon"></i></div>
                                    <div>
                                        <div className='section-details-header'>Username</div>
                                        { !isEditing && <div>{ seller.username }</div> }
                                        { isEditing && <input {...register("username", {
                                            required: "Username is required"
                                        })} type="text" id="username" name="username" value={ seller.username } className="profile-input" />}
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
                                        })} type="text" id="email" name="email" value={ seller.email } className="profile-input" />}
                                    </div>
                                </div>
                                <div className='profile-details-items'>
                                    <div className='section-icon'><i className="bi bi-key details-icon"></i></div>
                                    <div>
                                        <div className='section-details-header'>Password</div>
                                        { !isEditing && <div>••••••••</div> }
                                    </div>
                                </div>
                                <div className='profile-details-items'>
                                    <div className='section-icon'><i className="bi bi-calendar3 details-icon"></i></div>
                                    <div>
                                        <div className='section-details-header'>Date Joined</div>
                                        <div>{ formatDate(seller.created_at) }</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-items'>
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
                                        })} type="number" id="contact" name="contact" value={ seller.contact } className="profile-input" />}
                                    </div>
                                </div>
                                <div className='profile-details-items'>
                                    <div className='section-icon'><i className="bi bi-instagram details-icon"></i></div>
                                    <div>
                                        <div className='section-details-header'>Instagram</div>
                                        { !isEditing && <div>{ seller.instagram }</div> }
                                        { isEditing && <input {...register("instagram", {
                                            required: "Instagram is required"
                                        })} type="text" id="instagram" name="instagram" value={ seller.instagram } className="profile-input" />}
                                    </div>
                                </div>
                                <div className='profile-details-items'>
                                    <div className='section-icon'><i className="bi bi-tiktok details-icon"></i></div>
                                    <div>
                                        <div className='section-details-header'>TikTok</div>
                                        { !isEditing && <div>{ seller.tiktok }</div> }
                                        { isEditing && <input {...register("tiktok", {
                                            required: "TikTok is required"
                                        })} type="text" id="tiktok" name="tiktok" value={ seller.tiktok } className="profile-input" />}
                                    </div>
                                </div>
                                <div className='profile-details-items'>
                                    <div className='section-icon'><i className="bi bi-globe details-icon"></i></div>
                                    <div>
                                        <div className='section-details-header'>Website</div>
                                        { !isEditing && <div>{ seller.website }</div> }
                                        { isEditing && <input {...register("website", {
                                            required: "Website is required"
                                        })} type="text" id="website" name="website" value={ seller.website } className="profile-input" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='update-button-div'>
                            <div className="button-full update-button" onClick={ () => setIsEditing(true) }>Update Profile</div>
                        </div>
                    </div>
                </div>
            </form>
    )
}

export default SellerProfile;