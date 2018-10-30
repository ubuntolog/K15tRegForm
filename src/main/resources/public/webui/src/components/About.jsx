import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid, PanelGroup, Panel, Tabs, Tab} from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/actions';

import ErrorMessage from './ErrorMessage';


class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            <div>
                <Row>
                    <Col>
                        About
                    </Col>
                </Row>
            </div>
        )
    }
}

About.propTypes = {
    actions: PropTypes.object.isRequired,
};

export default About;
