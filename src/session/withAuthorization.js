import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../components/firebase';

const withAuthorization = condition => Component => {

    class WithAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged( //Gets current user
                authUser => {
                    //if user is not signed in, then redirect to signin page
                    if (!condition(authUser)) {
                        this.props.history.push('/signin');
                    }
                },
            );
        }
        componentWillUnmount() {
            this.listener();
        }
        render() {
            return (
                <Component {...this.props} />
            );
        }
    }
    return compose(
        withRouter,
        withFirebase,
    )(WithAuthorization);
};
export default withAuthorization;
