const util = require('minecraft-server-util');

util.status('mc.stibarc.com', { port: 25561 })
    .then((response) => {
        console.log(JSON.stringify(response));
    })
    .catch((error) => {
        console.error(JSON.stringify(error));
    });