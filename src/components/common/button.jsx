import React from 'react';

const Button = ({children, textColor="black" , className="", ...props}) => {
    return (
    <button className={` ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}

export default Button;
