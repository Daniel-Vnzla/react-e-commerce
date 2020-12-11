import React from 'react';

const CustomSelect = ({ options, label, name }) => {
  return (
  	<div class="custom-input">			
			<select id={name} name={name}>
				{options.map(option => (
					<option value={option}>{option}</option>
					))}
			</select>
			<label for={name}>
				{label}				
			</label>
		</div>
  )
}

export default CustomSelect;