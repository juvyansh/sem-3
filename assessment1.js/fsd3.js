console.log("Script start");

// 2. setTimeout
setTimeout(() => {
    console.log("setTimeout callback");
}, 0);

// 3. setImmediate
setImmediate(() => {
    console.log("setImmediate callback");
});

// 4. Promise
Promise.resolve().then(() => {
    console.log("Promise.then callback");
});

// 5. process.nextTick
process.nextTick(() => {
    console.log("process.nextTick callback");
});

// 6. End of script
console.log("Script end");