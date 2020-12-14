import React from 'react';

class CustomInput extends React.Component {
  render () {
  	return <div className="custom-input">
			<input onChange={this.props.onChange} id={this.props.name} type="text" name={this.props.name} required />
			<label htmlFor={this.props.name}>{this.props.label}</label>
		</div>
  }
}

export default CustomInput;