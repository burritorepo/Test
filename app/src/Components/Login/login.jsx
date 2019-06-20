import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { UIbutton } from '../../ui/button/button.component';
import { UIinput } from '../../ui/input/input.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHandHoldingUsd
} from '@fortawesome/free-solid-svg-icons';
import { UIselect } from '../../ui/select/select.component';
import { MapLayout } from '../Map';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            orderID: '123',
            userType: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <UIinput name="username" value={this.state.username} label="First Name" onChange={this.handleChange}></UIinput>
                </div>
                <div><UIselect id='2' placeholder="Holder" name="userType" className="select" value={this.state.userType} onChange={this.handleChange} options={[{ key: 'client', value: 'client' }, { key: 'driver', value: 'driver' }]} /></div>
                <MapLayout {...this.state} />
            </div>
        )
    }
}

export { Login };
