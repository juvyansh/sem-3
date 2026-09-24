const EventEmitter = require("events");

class Element extends EventEmitter {
    constructor(name, parent = null) {
        super();
        this.name = name;
        this.parent = parent;
    }

    addEventListener(type, handler) {
        this.on(type, handler);
    }

    removeEventListener(type, handler) {
        this.off(type, handler);
    }

    dispatchEvent(type, data = {}) {
        const event = {
            type: type,
            target: this,
            currentTarget: null,
            data: data,
            stopped: false,

            stopPropagation() {
                this.stopped = true;
            }
        };

        let element = this;

        while (element) {
            event.currentTarget = element;

            // Call all listeners for the current element
            element.emit(type, event);

            // Stop bubbling if stopPropagation() was called
            if (event.stopped) {
                break;
            }

            element = element.parent;
        }
    }
}

// Create hierarchy
const documentElement = new Element("document");
const form = new Element("form", documentElement);
const button = new Element("button", form);

// Button listener
function buttonHandler(event) {
    console.log(
        `Button listener: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );
}

// Form listener
function formHandler(event) {
    console.log(
        `Form listener: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );
}

// Document listener
function documentHandler(event) {
    console.log(
        `Document listener: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );
}

// Attach click listeners
button.addEventListener("click", buttonHandler);
form.addEventListener("click", formHandler);
documentElement.addEventListener("click", documentHandler);


// ---------------- SCENARIO A ----------------
console.log("\n--- Scenario A ---");
button.dispatchEvent("click", { message: "Button clicked" });


// ---------------- SCENARIO B ----------------
console.log("\n--- Scenario B ---");

// Make form stop propagation
function formStopHandler(event) {
    console.log(
        `Form listener: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );
    event.stopPropagation();
}

// Replace form listener
form.removeEventListener("click", formHandler);
form.addEventListener("click", formStopHandler);

button.dispatchEvent("click");


// ---------------- SCENARIO C ----------------
console.log("\n--- Scenario C ---");

// Remove button listener
button.removeEventListener("click", buttonHandler);

button.dispatchEvent("click");


// ---------------- KEYPRESS EVENT ----------------
console.log("\n--- Keypress Event ---");

form.addEventListener("keypress", (event) => {
    console.log(
        `Keypress listener: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );
});

form.dispatchEvent("keypress", { key: "Enter" });