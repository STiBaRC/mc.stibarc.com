const sjs = require("sprucehttp_sjs");
const util = require("minecraft-server-util");

util
  .queryFull("mc.stibarc.com", 25565)
  .then((response) => {
    sjs.writeStatusLine(200);
    sjs.writeHeader("Content-Type", "application/json");
    sjs.writeData(JSON.stringify(response));
    process.exit();
  })
  .catch((error) => {
    sjs.writeStatusLine(500);
    sjs.writeHeader("Content-Type", "application/json");
    sjs.writeData(JSON.stringify(error));
    process.exit();
  });
