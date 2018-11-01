import axios from 'axios';
import Alert from 'react-s-alert';
import {push} from 'react-router-redux';
import actionTypes from './actionTypes';
import {apiNames} from '../constants';

function errHandler(msg) {
    return function(err) {
        const alert = (msg) => {
            Alert.error(msg);
            console.error(msg);
            console.log('error: ', err);
        };
        const response = err.response || {};
        if (response.status == 401) {
            alert("Please login");
        } else if (response.status == 403) {
            alert("Access denied. "+(response.data || ""));
        } else if (response.status == 504) {
            alert("The server does not respond (gateway timeout).");
        } else {
            msg = msg || "An error occurred while contacting the server.";
            if (response.data) {
                msg += " " + response.data;
            }
            alert(msg, response);
        }
    }
}

export function fetchApiInfo() {
    return function (dispatch, getState) {
        axios.get(apiNames.apiinfo).then(response => {
            dispatch({
                type: actionTypes.APIINFO_FETCH_SUCCESS,
                apiinfo: response.data
            });
        }).catch(errHandler());
    }
}

function registrationSubmissionSuccess(registration) {
    return {
        type: actionTypes.REGISTRATION_SUBMISSION_ERROR,
        registration: registration
    }
}

function registrationSubmissionError(errorMessage) {
    return {
        type: actionTypes.REGISTRATION_SUBMISSION_ERROR,
        errorMessage: errorMessage
    }
}

export function submitRegistration(name, password, address, email, phone) {
    return function (dispatch, getState)  {
        const fd = new FormData();
        fd.append("name", name);
        fd.append("password", password);
        fd.append("address", address);
        fd.append("email", email);
        fd.append("phone", phone);
        axios.post(apiNames.user, fd).then(response => {
            dispatch(registrationSubmissionSuccess(response.data));
        }).catch(err => {
            errHandler()(err);
            dispatch(registrationSubmissionError(err));
        })
    }
}
