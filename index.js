// Oliver Kovacs 2020
// wslrpc - index.js

const cp = require("child_process");
const config = require("./config.json");

const execAsync = cmd => {
    return new Promise((resolve, reject) => {
        cp.exec(cmd, (err, stdout, stderr) => {
            if (err) return reject(err);
            resolve(stdout);
        });
    });
};

const createRPCObject = (WinVersion, WSLVersion) => {
    let RPCObject = {};
    RPCObject.details = config.overwriteDetails || `${WSLVersion.NAME || WSLVersion.DISTRIB_ID} WSL${2}`;
    if (config.showTimestamp) {
        RPCObject.startTimestamp = new Date();
    }
    if (config.showLargeImage) {
        RPCObject.largeImageKey = (WSLVersion.NAME || WSLVersion.DISTRIB_ID).toLowerCase();
        RPCObject.largeImageText = config.overwriteLargeImageText || `${WSLVersion.NAME || WSLVersion.DISTRIB_ID} ${WSLVersion.DISTRIB_RELEASE || WSLVersion.VERSION || WSLVersion.VERSION_ID}`;
    }
    if (config.showSmallImage) {
        RPCObject.smallImageKey = "windows";
        RPCObject.smallImageText = config.overwriteSmallImageText || WinVersion;
    }
    return RPCObject;
}

(async () => {
    if (!config.on) return;
    let sysinfo = execAsync(`node.exe sysinfo.js`);
    let release = execAsync("cat /etc/*-release");
    let WinVersion = (await sysinfo).match(/OS Name:\s*Microsoft [\w\s]*\r\n/)[0].split(":")[1].replace(/\s*Microsoft\s/, "").slice(0, -2);
    let WSLVersion = Object.fromEntries((await release).replace(/"/g, "").split(/\n|\r\n/).map(line => line.split("=")));
    WSLVersion.NAME = WSLVersion.NAME.split(" ")[0];
    
    const RPCObject = createRPCObject(WinVersion, WSLVersion);
    cp.spawn("node.exe", [ `${__dirname}/windows.js`, JSON.stringify(RPCObject) ]);
})().catch(error => console.error(error));
