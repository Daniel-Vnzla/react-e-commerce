import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ totalCartItems }) => {
	const { pathname } = useLocation();

  return (
    <header className="header">
			<h1><Link to="/" >E-Commerce</Link></h1>
			<nav className="navbar">
				<ul>
					<li><Link to="/products" >Explore</Link></li>
				</ul>
					{ pathname === "/" && 
					<Link to="/cart" className="icon cart" data-quantity={ totalCartItems > 99 ? "99+" : totalCartItems } >
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="687" height="448" viewBox="0 0 687 448">
					<title></title>
					<g id="icomoon-ignore">
					</g>
						<path fill="#000" d="M381 390.25c0 22.75-18.25 41-41 41s-41.25-18.25-41.25-41 18.5-41.25 41.25-41.25 41 18.5 41 41.25zM193.75 390.25c0 22.75-18.5 41-41.25 41s-41-18.25-41-41 18.25-41.25 41-41.25 41.25 18.5 41.25 41.25zM0 16.75c73.75 77.75 143 89.25 415 89.25s152.5 60.5-15.5 210.5c53.25-92.5 236.25-174.5-63.75-170-287.75 4.25-304.75-83.25-335.75-129.75z"></path>
					</svg>
				</Link> 
				}
			</nav>
		</header>
  )
}

export default Header;