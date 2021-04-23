import React from 'react';
import { Link } from 'react-router-dom';

class Linkki extends React.Component {
    render() {
        return (
            <div>
                <p>Copy the following link address for your guests to answer your invitation:</p>
                <ul>
                    <li><Link to="/RSVP">Invitation page</Link></li>
                </ul>
            </div>
        );
    }
}

export default Linkki;