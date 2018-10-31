import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, Glyphicon, ButtonToolbar, Modal} from 'react-bootstrap';

class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        this.setState({ show: true });
    }

    render() {
        console.log(this.props);
        return(
                <div>
                    <form>
                    <FormGroup
                        controlId="nameGroup"
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
                        controlId="passwordGroup"
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
                        controlId="addressGroup"
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
                        controlId="emailGroup"
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
                    <ButtonToolbar>
                        <Button type="submit">Register</Button>
                        <Button title="Get help" onClick={this.handleShow}>
                            <Glyphicon glyph="info-sign" />
                        </Button>
                    </ButtonToolbar>                    
                </form> 


                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>About this application</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>User registration form {this.props.apiinfo.version}</h4>
                        <p>
                            This application was developed by {this.props.apiinfo.author}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

Registration.propTypes = {
    apiinfo: PropTypes.object.isRequired
};

export default Registration;
