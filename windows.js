const { Client } = require("discord-rpc");
const rpc = new Client({ transport: "ipc" });
const { clientId } = require("./config.json");

let RPCObject = JSON.parse(process.argv[2]);
RPCObject.startTimestamp &&= new Date;

rpc.login({ clientId });
rpc.on("ready", () => {
    rpc.setActivity(RPCObject);
    const { username, discriminator } = rpc.user;
    console.log(`RPC user: ${username}#${discriminator}`);
});
