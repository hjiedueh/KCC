import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navbar.scss";

const Navigationbar = ({ auth, onClick }) => (
	<Navbar
    	bg="dark"
      	variant="dark"
      	expand="sm"
      	className="mb-3"
      	style={{ minHeight: "4rem" }}
   	>
    	<Link to="/">
			<Navbar.Brand><h1>KCC</h1></Navbar.Brand>
		</Link>
      	<Nav className="ml-auto">
      		{auth ? (
      			<div>
					<Link className="user-link" to="/logout">
				        Logout
				    </Link>
			    </div>
	      	) : (
	      		<div>
		      		<Link className="user-link" to="/login">
				        Login
			      	</Link>
			      	<Link className="user-link" to="/signup">
				        Register
				    </Link>
			    </div>
	      	)}
      	</Nav>
   	</Navbar>
);

Navigationbar.propTypes = {
   auth: PropTypes.bool.isRequired,
   onClick: PropTypes.func.isRequired
};

export default Navigationbar;