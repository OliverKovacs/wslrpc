# wslrpc

[Discord Rich Presence (RPC)](https://discord.com/rich-presence) for [Windows Subsystem for Linux (WSL, WSL2)](https://docs.microsoft.com/en-us/windows/wsl/about)

### Usage:
You need to have [Node.js](https://nodejs.org/en/) installed on **Windows** for this to work.

Install
```bash
# run in Windows or WSL, whereever you have git and npm installed
git clone https://github.com/OliverKovacs/wslrpc
cd wslrpc
npm i
```

Start
```bash
# run in WSL while Discord desktop is open
node.exe index.js "$(cat /etc/*-release)"

# <path to windows node.exe> <path to index.js> "$(cat /etc/*-release)" <WSL version, default 2>
```

### Config
In `./config.json`.

### Note:
Currently only Ubuntu and Kali are supportet, but it might also work with other Distributions without images.