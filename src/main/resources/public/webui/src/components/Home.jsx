import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return(
            <div>
                    <form>
                    <FormGroup
                        controlId="nameG"
                    >
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        type="text"
                        value=""
                        placeholder="Enter your name"
                        name="name"                                        
                    />
                    </FormGroup>

                    <FormGroup
                        controlId="passwordG"
                    >
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        value=""
                        placeholder="Enter your password"
                        name="password"                                        
                    />
                    </FormGroup>


                    <FormGroup
                        controlId="addressG"
                    >
                    <ControlLabel>Address</ControlLabel>
                    <FormControl
                        type="text"
                        value=""
                        placeholder="Enter your address"
                        name="address"                                        
                    />
                    </FormGroup>

                    <FormGroup
                        controlId="emailG"
                    >
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        type="text"
                        value=""
                        placeholder="Enter your email address"
                        name="email"                                        
                    />
                    </FormGroup>
                    
                    <FormGroup
                        controlId="phoneG"
                    >
                    <ControlLabel>Phone number</ControlLabel>
                    <FormControl
                        type="text"
                        value=""
                        placeholder="Enter your phone number"
                        name="phone"                                        
                    />
                    </FormGroup>
                </form>                
            </div>
        )
    }
}

Home.propTypes = {};

export default Home;
