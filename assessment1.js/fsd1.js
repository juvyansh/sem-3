const EventEmitter = require("events");

class SessionManager extends EventEmitter {

    trigger(command, ...args) {
        if (command === "greet" || command === "exit") {
            this.emit(command, ...args);
        } else {
            console.log(`Unknown event: ${command}`);
        }
    }
}

const session = new SessionManager();

// greet event
session.on("greet", (username) => {
    console.log(`Hello, ${username}! Welcome.`);
});

// once listener for first login
session.once("greet", () => {
    console.log("First login of the day!");
});

// exit event
session.on("exit", (code) => {
    console.log(`Session closed with code ${code}. Goodbye!`);
});

// error listener
session.on("error", (message) => {
    console.log(`Error: ${message}`);
});

// Emit greet three times
session.trigger("greet", "Juvyansh");
session.trigger("greet", "Rahul");
session.trigger("greet", "Aman");

// Print listener count for greet
console.log("Greet listener count:", session.listenerCount("greet"));

// Emit exit
session.trigger("exit", 0);

// Unknown event
session.trigger("login");

// Emit custom error
session.emit("error", "Something went wrong in the session.");