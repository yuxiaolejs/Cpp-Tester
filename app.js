const child = require("child_process")
const file = process.argv[2]
let argvv = process.argv
argvv.splice(0, 3)
let comp = child.spawn('g++', [process.cwd()+"/"+file, "-Wall", "-o", "auto"])
comp.stderr.pipe(process.stdout)
comp.stderr.on("data", () => {
    // console.log("Compile Message")
})
comp.on("exit", (c) => {
    if (c == 0) {
        run()
    }
})

function run() {
    let inst = child.spawn(process.cwd() + "/auto", argvv)
    inst.stderr.on("data", (d) => {
        process.stdout.write("[ERR] ")
        process.stdout.write(d)
    })
    inst.stdout.on("data", (d) => {
        process.stdout.write("[OUT] ")
        process.stdout.write(d)
    })
    process.stdin.pipe(inst.stdin)
    inst.on("exit", (c) => {
        if (c != 0)
            console.log("Process ended with a non-zero code: " + c)
    })
}