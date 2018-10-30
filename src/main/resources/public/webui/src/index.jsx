import React from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {Router, IndexRoute, Route, browserHistory, hashHistory, Link } from 'react-router';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import {compose, applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {LinkContainer} from 'react-router-bootstrap';
import Alert from 'react-s-alert';

require('react-s-alert/dist/s-alert-default.css');
require('react-s-alert/dist/s-alert-css-effects/slide.css');

import rootReducers from './actions/reducers';
import {fetchApiInfo} from './actions/actions';

import {Grid, Row, Col, Button} from 'react-bootstrap';
import {AboutContainer} from './containers/AboutContainer';

import Home from './components/Home';

import ErrorMessage from './components/ErrorMessage';


const devTools = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    || (f => f);

const middleware = compose(
    applyMiddleware(
        thunkMiddleware,
        routerMiddleware(browserHistory),
        // createLogger(),
    ),
    devTools
);
const store = createStore(rootReducers, middleware);
const history = syncHistoryWithStore(browserHistory, store);


class Frame extends React.Component {
    constructor(props) {
        super(props);
    }

    inIframe () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    render() {
        return (
          <Grid>              
              {this.props.children}
          </Grid>
       )
    }
}
Frame = connect(s => s)(Frame);




class App extends React.Component {
    constructor(props) {
        super(props);
        store.dispatch(fetchApiInfo());
    }

    render() {
        console.log(this.props);
        return (
            <Provider store={store}>
                <div>
                    <Router history={history}>
                        <Route path={window.APP_CONTEXT_PATH+'/'} component={Frame}>
                            <IndexRoute component={Home}/>
                            <Route path={window.APP_CONTEXT_PATH+'/about'} component={AboutContainer} />
                            <Route path='*' component={NotFound} />
                        </Route>
                    </Router>

                    <Alert stack={{limit:5}}/>
                </div>
            </Provider>
        );
    }
}

const NotFound = () => (
    <Row>
        <Col xs={12} sm={12} md={12} lg={12} className="pull-center">
            <ErrorMessage title={"Page not found"} content={<p>The requested page does not exist. Please check the URL or try to start from the <a href={window.APP_CONTEXT_PATH+"/"}>main page</a></p>} />
        </Col>
    </Row>
);

render(<App />, document.getElementById('react') );
