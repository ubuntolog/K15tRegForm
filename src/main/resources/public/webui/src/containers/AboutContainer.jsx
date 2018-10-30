import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import About from '../components/About';
import * as actions from '../actions/actions';

const mapStateToProps = (state) => {
    return {
        treebanks: state.treebanks,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export const AboutContainer = connect(mapStateToProps, mapDispatchToProps)(About);
