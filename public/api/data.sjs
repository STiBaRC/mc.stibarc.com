const util = require('minecraft-server-util');

var res = {};

util.status('mc.stibarc.com', { port: 25561 })
    .then((response) => {
        res.status = response;
        util.queryFull('mc.stibarc.com', { port: 25561 })
            .then((response) => {
                res.query = response;
                console.log(JSON.stringify(res));
            })
            .catch((error) => {
                console.error(JSON.stringify(error));
            });
    })
    .catch((error) => {
        console.error(JSON.stringify(error));
    });