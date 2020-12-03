// Oliver Kovacs 2020
// wslrpc - index.js

const { exec } = require("child_process");
const { Client } = require("discord-rpc");
const config = require("./config.json");

const rpc = new Client({ transport: "ipc" });
const clientId = "748970741013151807";
let WinVersion, WSLVersion;

exec("systeminfo", (err, stdout, stderr) => {
    if (!config.enable) return;
    if (err) return console.error(`Exec error: ${err}`);

    WinVersion = stdout.match(/OS Name:\s*Microsoft [\w\s]*\r\n/)[0].split(":")[1].replace(/\s*Microsoft\s/, "").slice(0, -2);
    WSLVersion = Object.fromEntries(process.argv[2].replace(/"/g, "").split(/\n|\r\n/).map(line => line.split("=")));
    WSLVersion.NAME = WSLVersion.NAME.split(" ")[0];

    rpc.login({ clientId });
});

rpc.on("ready", () => {

    let RPCObject = {
        details: `${WSLVersion.NAME || WSLVersion.DISTRIB_ID} WSL${process.argv[3] || 2}`,
    }
    
    if (!config.hideTimestamp) {
        RPCObject.startTimestamp = new Date();
    }
    if (!config.hideLargeImage) {
        RPCObject.largeImageKey = (WSLVersion.NAME || WSLVersion.DISTRIB_ID).toLowerCase();
        RPCObject.largeImageText = `${WSLVersion.NAME || WSLVersion.DISTRIB_ID} ${WSLVersion.DISTRIB_RELEASE || WSLVersion.VERSION || WSLVersion.VERSION_ID}`;
    }
    if (!config.hideSmallImage) {
        RPCObject.smallImageKey = "windows";
        RPCObject.smallImageText = WinVersion;
    }

    rpc.setActivity(RPCObject);

    const { username, discriminator } = rpc.user;
    console.log(`RPC user: ${username}#${discriminator}`);
});