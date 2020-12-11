import React from 'react';

const CustomSelect = ({ options, label, name, onChange }) => {
  return (
  	<div className="custom-input">			
			<select id={name} name={name} onChange={onChange}>
				{options.map(({ id, label })=> (
					<option key={id} value={label}>{label}</option>
					))}
			</select>
			<label htmlFor={name}>
				{label}				
			</label>
		</div>
  )
}

export default CustomSelect;