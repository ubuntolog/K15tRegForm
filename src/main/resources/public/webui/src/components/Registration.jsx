import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup, ControlLabel, FormControl, Button, Glyphicon, ButtonToolbar, Modal, HelpBlock} from 'react-bootstrap';

const formFields = ["name", "password", "address", "email", "phone"];
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

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        this.props.actions.submitRegistration(
                                                data.get(formFields[0]),
                                                data.get(formFields[1]),
                                                data.get(formFields[2]),
                                                data.get(formFields[3]),
                                                data.get(formFields[4])
                                            );
    }

    componentDidMount() {
        this.props.actions.fetchVisitors();
    }

    render() {
        console.log(this.props);
        const registration = (this.props.registration ? this.props.registration : {});
        let validationStatus = {};
        for (let field of formFields) {
            validationStatus[field] = {};
            validationStatus[field]["state"] = null;
            validationStatus[field]["message"] = "";

            if (registration.errors) {
                if (registration.errors[field]) {
                    validationStatus[field]["state"] = "error";
                    validationStatus[field]["message"] = registration.errors[field].join(". ");
                }
            } else {
                if (Object.keys(registration).length > 0) {
                    validationStatus[field]["state"] = "success";
                }
            }  
        }
        return(
                <div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup
                        controlId="nameGroup"
                        validationState={validationStatus[formFields[0]]["state"]}
                    >
                        <ControlLabel>Name</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter your name"
                            name={formFields[0]}                                        
                        />
                        <FormControl.Feedback />
                        <HelpBlock>{validationStatus[formFields[0]]["message"]}</HelpBlock>
                    </FormGroup>

                    <FormGroup
                        controlId="passwordGroup"
                        validationState={validationStatus[formFields[1]]["state"]}
                    >
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password" 
                            placeholder="Enter your password"
                            name={formFields[1]}                                        
                        />
                        <FormControl.Feedback />
                        <HelpBlock>{validationStatus[formFields[1]]["message"]}</HelpBlock>
                    </FormGroup>

                    <FormGroup
                        controlId="addressGroup"
                        validationState={validationStatus[formFields[2]]["state"]}
                    >
                        <ControlLabel>Address</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter your address"
                            name={formFields[2]}                                       
                        />
                        <FormControl.Feedback />
                        <HelpBlock>{validationStatus[formFields[2]]["message"]}</HelpBlock>
                    </FormGroup>

                    <FormGroup
                        controlId="emailGroup"
                        validationState={validationStatus[formFields[3]]["state"]}
                    >
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter your email address"
                            name={formFields[3]}                                        
                        />
                        <FormControl.Feedback />
                        <HelpBlock>{validationStatus[formFields[3]]["message"]}</HelpBlock>
                    </FormGroup>
                    
                    <FormGroup
                        controlId="phoneGroup"
                        validationState={validationStatus[formFields[4]]["state"]}
                    >
                        <ControlLabel>Phone number</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter your phone number"
                            name={formFields[4]}                                       
                        />
                        <FormControl.Feedback />
                        <HelpBlock>{validationStatus[formFields[4]]["message"]}</HelpBlock>
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
    apiinfo: PropTypes.object.isRequired,
    registration: PropTypes.object.isRequired,
    visitors: PropTypes.array.isRequired
};

export default Registration;
