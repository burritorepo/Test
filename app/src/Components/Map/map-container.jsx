import React, { Component, Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UIbutton } from '../../ui/button/button.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHandHoldingUsd
} from '@fortawesome/free-solid-svg-icons';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import io from 'socket.io-client';
import { carIcon, clientIcon } from '../Icons';

const styleMap2 = 'http://a.tile.stamen.com/toner/{z}/{x}/{y}.png';
let ordersSocket = io.connect('http://localhost:4000/orders');

const MyMarker = props => {
    const initMarker = ref => {
        if (ref) {
            ref.leafletElement.openPopup()
        }
    };
    return <Marker ref={initMarker} {...props} draggable="true" />
};

function MapContainer(props) {

let [inRoom, setInRoom] = useState(false);

    useEffect(() => {

        if (inRoom) {
            console.log('Joining room!');
            ordersSocket.emit('joinRoom', props.orderID);
        };

        return () => {
            if (inRoom) {
                console.log('leaving room');
                ordersSocket.emit('leave room', {
                    room: props.orderID
                });
            };
        };

    });

    // // INIT
    // let userProfile = {
    //     username: props.username,
    //     userType: props.userType
    // };

    // console.log('RENDER', props)
    // let newlatlng = props.position;
    // const new_lat = newlatlng[0];
    // const new_lng = newlatlng[1];
    // let serverData;

    // let Details = {
    //     username: props.username,
    //     active: true,
    //     new_lat: new_lat,
    //     new_lng: new_lng,
    //     update: true,
    //     userType: props.userType
    // };



    // ordersSocket.emit('load_init');
    // ordersSocket.on('load_init', function (data) {
    //     console.log('SERVERDATA', data);
    // });

    // ordersSocket.on('success', msg => {
    //     ordersSocket.emit('add user', userProfile);
    //     ordersSocket.emit('new_coords', Details);
    //     /*  ordersSocket.on('updatecoords', function (data) {
    //          console.log('ACTUALIZO', data.username);
    //      }); */
    // });

    const handleInRoom = () => {
        inRoom
            ? setInRoom(false)
            : setInRoom(true);
    }

    return (

        <Fragment>
            <button onClick={() => handleInRoom()}>
                {inRoom && `Leave Room`}
                {!inRoom && `Enter Room`}
            </button>
            <div>
                <h1>{props.position}</h1>
            </div>
            {/* {serverData !== undefined ? */}
            (<Map className="map-template-1" center={props.position} zoom={13} zoomControl={false} attributionControl={false}>
                <TileLayer
                    url={styleMap2}
                />
                {
                    props.userType === 'client' ? (
                        <MyMarker position={props.position} icon={clientIcon} >
                            <Popup>
                                <span>Cliente Online: {props.username}</span>
                            </Popup>
                        </MyMarker>
                    ) : (
                            <MyMarker position={props.position} icon={carIcon} >
                                <Popup >
                                    <span>Conductor Online: {props.username}</span>
                                </Popup>
                            </MyMarker>
                        )
                }
            </Map>) : <h1> LOADING... </h1>
            {/* } */}
        </Fragment>
    )
}

export { MapContainer };

{/*             <div className="order-btn">
    <UIbutton component={Link} to='/' className="order-accept-btn" name="button" color="primary"><FontAwesomeIcon icon={faHandHoldingUsd} />BACK</UIbutton>
</div> */}