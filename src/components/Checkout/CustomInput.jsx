import React from 'react';

const CustomInput = ({ label, name, type }) => {
  return (
   <div class="custom-input">
			<input id={name} type={type} name={name} required />
			<label for={name}>{label}</label>
		</div>
  )
}

export default CustomInput;