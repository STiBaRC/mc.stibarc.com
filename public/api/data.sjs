const sjs = require("sprucehttp_sjs");
const util = require("minecraft-server-util");

var res = {};

util
  .status("mc.stibarc.com", { port: 25561 })
  .then((response) => {
    res.status = response;
    util
      .queryFull("mc.stibarc.com", { port: 25561 })
      .then((response) => {
        res.query = response;
        sjs.writeStatusLine(200);
		sjs.writeHeader("Content-Type", "application/json");
		sjs.writeData(JSON.stringify(res));
		process.exit();
      })
      .catch((error) => {
        sjs.writeStatusLine(500);
		sjs.writeHeader("Content-Type", "application/json");
		sjs.writeData(JSON.stringify(error));
		process.exit();
      });
  })
  .catch((error) => {
    sjs.writeStatusLine(500);
	sjs.writeHeader("Content-Type", "application/json");
	sjs.writeData(JSON.stringify(error));
	process.exit();
  });
