require("child_process").exec("systeminfo", (error, stdout) => {
    if (error) throw(error);
    console.log(stdout);
});
