import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../config';

class Navigator extends Component {
    logout = () => {
        return firebaseAuth().signOut()
    }

    render() {
        let logLink = null;
        if (this.props.isAuthenticated)
            logLink = <button className="btn btn-link" onClick={()=>this.logout}>Logout</button>;
        else
            logLink = <Link className="nav-link" to="/login">Login</Link>;

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Todo</Link>
                            </li>

                        </ul>
                        <ul className="navbar-nav ml-auto">
                            {logLink}
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navigator;