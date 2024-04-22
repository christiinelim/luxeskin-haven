import React, { useRef } from "react";
import verificationImage from "../../../assets/images/verification/verification.gif"

const SellerVerifyAccount = () => {
    const inputRefs = useRef([null, null, null, null, null, null]);

    const handleKeyUp = (e, index) => {
        const { key } = e;

        if (key === "Backspace" && index > 0) {
            inputRefs.current[index - 1].focus();
        } else if (key !== "Backspace" && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const token = inputRefs.current.map((ref) => ref.value).join("");
        console.log("Submitted:", token);
    };

    return (
        <div>
            <div>
                <img src={verificationImage} alt="verification image"/>
            </div>
            <div>
                <div>Please verify your email</div>
            </div>
            <div>
                <div>A verification code has been sent to</div>
                <div>
                    <input type="text" value="email.com" disabled/>
                </div>
                <div>If you don't see it, you may have to check the spam folder. Please enter the code below to verify your email. The code will expire in 10 minutes.</div>
                <form onSubmit={onSubmit} className="">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            className=""
                            maxLength={1}
                            onKeyUp={(e) => handleKeyUp(e, index)}
                        />
                    ))}
                    <button type="submit" className="">Verify</button>
                </form>
            </div>
        </div>
    );
};

export default SellerVerifyAccount;
