let active = false;
let update = false;
let users = [];

module.exports = function (socket) {

    console.log('connected!');

    let addedUser = false;

    socket.on('joinRoom', (room) => {
        console.log(room);

        socket.join(room);

        socket.to(room).emit('success', 'Usuario dentro de OrderID');
        // Add New User to Users Array
        socket.on('add user', (username) => {
            console.log('llego este', username);
            if (addedUser) return;
            socket.username = username;
            let new_count = users.length;

            console.log('increase users', new_count);

            let new_user = {
                username: username,
                active: active,
                lat: null,
                lng: null,
                update: false
            };
            users.push(new_user);
            console.log('total', users);
        });
        // New User sends coords and changes their profile
        socket.on('new_coords', data => {
            console.log('CLIENT',data);

            let New_Details = {
                username: data.username,
                active: data.active,
                lat: data.new_lat,
                lng: data.new_lng,
                update: true
            };

            let checkuser = data.username;
            result = users.map(obj => obj.username).indexOf(checkuser) >= 0;
            //UPDATE USER IF USER ALREADY EXITS
            if (result === true) {
                objIndex = users.findIndex((obj => obj.username == data.username));
                users[objIndex].lat = data.new_lat;
                users[objIndex].lng = data.new_lng;
                users[objIndex].active = data.active;
                users[objIndex].update = true;

                let to_send = {
                    username: data.username,
                    active: true,
                    lat: data.new_lat,
                    lng: data.new_lng,
                    update: true
                };

                console.log(data.username + ' has just updated their location');
                var new_count = users.length;
                console.log(new_count);
                console.log(users);

                //SEND BACK UDPATED COORDS TO CLIENT  RELATED TO EXISTING USER
                socket.to(room).emit('updatecoords', to_send);

                /* socket.broadcast.emit('updatecoords', to_send); */

                objIndex = users.findIndex((obj => obj.username == data.username));
                users[objIndex].update = false;
            }
        });
    });
}



