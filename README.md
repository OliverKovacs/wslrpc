# wslrpc

[Discord Rich Presence (RPC)](https://discord.com/rich-presence) for [Windows Subsystem for Linux (WSL, WSL2)](https://docs.microsoft.com/en-us/windows/wsl/about)

### Usage:
You need to have [Node.js](https://nodejs.org/en/) installed on both Windows and WSL for this to work.

Install
```bash
# run in WSL
git clone https://github.com/OliverKovacs/wslrpc && cd wslrpc
npm i
sudo ./install.sh
```

Uninstall
```bash
# run in WSL
sudo ./uninstall.sh
cd .. && rm -rf wslrpc
```

### Config
In `./config.json`.

### Note:
Currently only Ubuntu and Kali are directly supported, but it also works with other distros if you configure it manually.