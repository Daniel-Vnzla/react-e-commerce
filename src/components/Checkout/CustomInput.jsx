import React from 'react';

const CustomInput = ({ label, name, type }) => {
  return (
   <div className="custom-input">
			<input id={name} type={type} name={name} required />
			<label htmlFor={name}>{label}</label>
		</div>
  )
}

export default CustomInput;