import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../context/UserContext';
import styles from './styles.module.css';
import contact from '../../assets/images/main/contact.png';

const Contact = () => {
    const userContext = useContext(UserContext);
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();
    const [ success, setSuccess ] = useState(false)

    const onSubmit = async (data) => {
        try {
            await userContext.sendContactForm(data);
            setSuccess(true);
        } catch (error) {
            console.log(error)
            setError("root", {
                message: "Error submitting"
            })
        }
    };

    return (
        <div className={styles['contact-wrapper']}>
            <div><img src={ contact } className={styles['contact-image']} alt="contact"/></div>
            <div className='page-header'>Contact Form</div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className={styles['contact-form']}>
                    <div>
                        <label>Name</label>
                        <input {...register("name", {
                            required: "Name is required"
                        })} type="text" id="name" name="name" />
                        { errors.name && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.name.message }</div> }
                    </div>

                    <div>
                        <label>Contact</label>
                        <input {...register("contact", {
                            required: "Contact is required"
                        })} type="text" id="contact" name="contact" />
                        { errors.contact && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.contact.message }</div> }
                    </div>

                    <div>
                        <label>Subject</label>
                        <input {...register("subject", {
                            required: "Subject is required"
                        })} type="text" id="subject" name="subject" />
                        { errors.subject && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.subject.message }</div> }
                    </div>

                    <div>
                        <label>Message</label>
                        <input {...register("message", {
                            required: "Message is required"
                        })} type="textarea" id="message" name="message" className={styles['message-input']} />
                        { errors.message && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.message.message }</div> }
                    </div>

                    <div className="submit-button-container">
                        <button disabled={ isSubmitting } type="submit" className="button-full submit-button">
                            { isSubmitting ? "Submitting" : "Submit" }
                        </button>
                    </div>
                    { errors.root && <div className="form-message form-error-box"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.root.message }</div> }
                    { success && 
                        <div className="form-message form-success-box">
                            <i className="bi bi-check-circle form-icon"></i>Message sent!
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}

export default Contact;
