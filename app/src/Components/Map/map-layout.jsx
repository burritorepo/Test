import React from 'react'
import { MapContainer } from './map-container'

function MapLayout(props) {
    const [position, setPosition] = React.useState([0, 0]);
    React.useEffect(() => {
        const watchID = navigator.geolocation.watchPosition(pos => {
            setPosition([pos.coords.latitude, pos.coords.longitude]);
        });
        return () => {
            navigator.geolocation.clearWatch(watchID);
        };
    }, [setPosition]);

    return (
        <div>
            <MapContainer position={position} username={props.username} userType={props.userType}  orderId={props.orderID}/>
        </div>
    )
}

export { MapLayout };
