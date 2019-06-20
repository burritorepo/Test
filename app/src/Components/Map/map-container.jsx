import React, { Component, Fragment } from 'react';
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
const ordersSocket = io.connect('http://localhost:4000/orders');

const MyMarker = props => {

    const initMarker = ref => {
      if (ref) {
        ref.leafletElement.openPopup()
      }
    }
  
    return <Marker ref={initMarker} {...props}/>
  }


function MapContainer(props) {
    let username = props.username;

   
    return (
        <Fragment>
            <div>
                <h1>{props.position}</h1>
            </div>
            <Map className="map-template-1" center={props.position} zoom={13} zoomControl={false} attributionControl={false}>
                <TileLayer
                    url={styleMap2}
                />
                {props.userType === 'client' ? (
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
                    )}

            </Map>
            {/*             <div className="order-btn">
                <UIbutton component={Link} to='/' className="order-accept-btn" name="button" color="primary"><FontAwesomeIcon icon={faHandHoldingUsd} />BACK</UIbutton>
            </div> */}
        </Fragment>
    )
}

export { MapContainer };
