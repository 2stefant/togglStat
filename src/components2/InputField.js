import React from 'react';

export const InputField = (props) => {

    const {id, title, value, handleChange}=props;

    return (
        <div className="InputField">
            <label>{title}:&nbsp;</label>
            <input 
                id={id} 
                name={id} 
                type="text" 
                defaultValue={value}  
                onChange={handleChange}
            />
        </div>
    );
};

export default InputField;



