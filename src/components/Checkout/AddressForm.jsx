import React, { useState, useEffect } from 'react';
import { commerce } from '../../lib/commerce.js';
import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import FormInput from './FormInput.jsx';
import CustomSelect from './CustomSelect.jsx';

const AddressForm = ({ checkoutToken, next }) => {
	const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const methods = useForm();

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
  	fetchShippingCountries(checkoutToken.id);  // eslint-disable-next-line 
  },[])

  useEffect(() => {
  	 if(shippingCountry) fetchSubdivisions(shippingCountry);  // eslint-disable-next-line 
  },[shippingCountry])
  
  useEffect(() => {
	  if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry ,shippingSubdivision);  // eslint-disable-next-line 
  },[shippingSubdivision])

  return (
  	<FormProvider {...methods}>
	    <form className="form" onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingOption, shippingSubdivision }))}>
		    <h4>Ship Address</h4>
				<FormInput name="firstName" label="First Name*" />
				<FormInput name="lastName" label="Last Name*" />
				<FormInput name="address1" label="Address*" />
				<FormInput name="email" label="Email*" />
				<FormInput name="city" label="City*" />
				<FormInput name="zip" label="ZIP / Postal code*" />

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
				<div className="address-form-actions">
				  <Link to="/cart">Back to Cart</Link>			
				  <button type="submit">Next</button>			
				</div>
			</form>
		</FormProvider>
  )
}

export default AddressForm;