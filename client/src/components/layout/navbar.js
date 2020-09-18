import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigationbar = ({ auth, onClick }) => (
	<Navbar
    	bg="dark"
      	variant="dark"
      	expand="sm"
      	className="mb-3"
      	style={{ minHeight: "4rem" }}
   	>
    	<Link to="/blog">
			<Navbar.Brand href="/"><h1>KCC</h1></Navbar.Brand>
		</Link>
      	<Nav className="ml-auto">
      		{auth ? (
      			<div>
					<Link to="/logout">
						<Button variant="primary" onClick={onClick}>
				        	Logout
				      	</Button>
				    </Link>
			    </div>
	      	) : (
	      		<div>
		      		<Link to="/login">
			      		<Button variant="primary">
				        	Login
				      	</Button>
			      	</Link>
			      	<Link to="/signup">
				      	<Button variant="primary">
				        	Register
				      	</Button>
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