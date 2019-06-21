let active = false;
let update = false;
let usersConnected = [];
let roomCurrent = null;

module.exports = function (socket) {

    console.log('New User');

    /*  let addedUser = false; */

    socket.on('joinRoom', (room) => {
        roomCurrent = room;
        console.log(room);
        socket.join(room);
        socket.to(room).emit('success', 'Usuario dentro de OrderID');
    });

    socket.on('load_init', (data) => {
        socket.emit('load_init', usersConnected);
    })

    // Add New User to Users Array
    socket.on('add user', (userProfile) => {
        console.log('llego este', userProfile);

        socket.username = userProfile.username;
        console.log('jugada socket', socket.username);

        let new_user = {
            username: userProfile.username,
            active: active,
            lat: null,
            lng: null,
            update: false,
            userType: userProfile.userType
        };

        usersConnected.push(new_user);

        let usersFiltered = usersConnected.reduce((acc, current) => {
            const x = acc.find(item => item.username === current.username);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);

        let new_count = usersFiltered.length;
        console.log('current users', new_count);

        usersConnected = usersFiltered;
        console.log(usersFiltered);
    });


    // New User sends coords and changes their profile
    socket.on('new_coords', data => {
        console.log('CLIENT', data);

        let New_Details = {
            username: data.username,
            active: data.active,
            lat: data.new_lat,
            lng: data.new_lng,
            update: true,
            userType: data.userType
        };

        let checkuser = data.username;
        result = usersConnected.map(obj => obj.username).indexOf(checkuser) >= 0;
        //UPDATE USER IF USER ALREADY EXITS
        if (result === true) {
            objIndex = usersConnected.findIndex((obj => obj.username == data.username));
            usersConnected[objIndex].lat = data.new_lat;
            usersConnected[objIndex].lng = data.new_lng;
            usersConnected[objIndex].active = data.active;
            usersConnected[objIndex].update = true;

            let to_send = {
                username: data.username,
                active: true,
                lat: data.new_lat,
                lng: data.new_lng,
                update: true,
                userType: data.userType
            };

            console.log(data.username + ' has just updated their location');
            var new_count = usersConnected.length;
            console.log(new_count);
            console.log(usersConnected);

            //SEND BACK UDPATED COORDS TO CLIENT  RELATED TO EXISTING USER
            socket.to(roomCurrent).emit('updatecoords', to_send);

            /* socket.broadcast.emit('updatecoords', to_send); */

            objIndex = usersConnected.findIndex((obj => obj.username == data.username));
            usersConnected[objIndex].update = false;
        }
    });

    socket.on('disconnect', () => {

        console.log('USER HAS DISCONNECTED');

        for (let i = 0; i < usersConnected.length; i++)
            if (usersConnected[i].username === socket.username) {
                socket.broadcast.emit('remove_marker', {
                    username: usersConnected[i].username
                });
                usersConnected.splice(i, 1);
                break;
            }
        let new_count = usersConnected.length;
        console.log(new_count);
        console.log('remove marker');
    });

    socket.on('leave room', data => {
        console.log('leaving room');
        console.log(data);
        socket.leave(data.room)
    });

    console.log('current', usersConnected);
}



