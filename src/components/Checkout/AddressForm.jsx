import React, { useState, useEffect } from 'react';
import { commerce } from '../../lib/commerce.js';

import CustomInput from './CustomInput.jsx';
import CustomSelect from './CustomSelect.jsx';

const AddressForm = ({ checkoutToken }) => {
	const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

	const options = [1,2,3];

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

    const formattedCountries = Object.entries(countries).map(([code, name]) => ({ id: code, label: name }))

    setShippingCountries(formattedCountries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

    const formattedSubdivisions = Object.entries(subdivisions).map(([code, name]) => ({ id: code, label: name }))

    setShippingSubdivisions(formattedSubdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };


  useEffect(() => {
  	fetchShippingCountries(checkoutToken.id);
  },[])

  useEffect(() => {
  	 if(shippingCountry) fetchSubdivisions(shippingCountry);
  },[shippingCountry])

  return (
    <form className="form" >
	    <h4>Ship Address</h4>
			<CustomInput name="firstName" label="First Name"  type="text"/>
			<CustomInput name="lastName" label="Last Name"  type="text"/>
			<CustomInput name="address1" label="Address"  type="text"/>
			<CustomInput name="email" label="Email"  type="email"/>
			<CustomInput name="city" label="City"  type="text"/>
			<CustomInput name="zip" label="ZIP / Postal code"  type="text"/>

			<div className="select-container">
				<CustomSelect 
					onChange={({ target }) => setShippingCountry(target.value)}
					name="ShippingCountry"
					label="Shipping Country" 
					options={shippingCountries} />
				<CustomSelect 
					onChange={({ target }) => setShippingSubdivision(target.value)}
					name="ShippingSubdivision"
					label="Shipping Subdivision" 
					options={shippingSubdivisions} />
			</div>
			  <button type="submit">Checkout</button>			
		</form>
  )
}

export default AddressForm;