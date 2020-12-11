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

	const formatSelectItems = (arr) => (
		Object.entries(arr).map(([code, name]) => ({ id: code, label: name }))
	)
	const formattedShippingOptions = shippingOptions.map((option) => ({ id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})` }))

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

    setShippingCountries(formatSelectItems(countries));
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubdivisions(formatSelectItems(subdivisions));
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };


  useEffect(() => {
  	fetchShippingCountries(checkoutToken.id);
  },[])

  useEffect(() => {
  	 if(shippingCountry) fetchSubdivisions(shippingCountry);
  },[shippingCountry])
  
  useEffect(() => {
	  if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry ,shippingSubdivision);
  },[shippingSubdivision])

  return (
    <form className="form" >
	    <h4>Ship Address</h4>
			<CustomInput name="firstName" label="First Name*"  type="text"/>
			<CustomInput name="lastName" label="Last Name*"  type="text"/>
			<CustomInput name="address1" label="Address*"  type="text"/>
			<CustomInput name="email" label="Email*"  type="email"/>
			<CustomInput name="city" label="City*"  type="text"/>
			<CustomInput name="zip" label="ZIP / Postal code*"  type="text"/>

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
					<CustomSelect 
					onChange={({ target }) => setShippingOption(target.value)}
					name="ShippingOption"
					label="Shipping Option" 
					options={formattedShippingOptions} />
			</div>
			<div className="form-actions">
			  <Link to="/cart">Checkout</Link>			
			  <button type="submit">Checkout</button>			
			</div>
		</form>
  )
}

export default AddressForm;