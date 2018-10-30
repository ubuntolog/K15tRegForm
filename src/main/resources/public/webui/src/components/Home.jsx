import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Row, Col} from 'react-bootstrap';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                
                <Row>
                    <Col>
                        <Grid>
                            <Row>
                                <Col>
                                   Home page1
                                </Col>
                            </Row>
                        </Grid>
                    </Col>
                </Row>
            </div>
        )
    }
}

Home.propTypes = {};

export default Home;
