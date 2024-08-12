// Some JavaScript boilerplate (c) Coosanta

import fs from "fs";
import { exec } from "child_process";


// Time libraries:

export function dateTimeToMilliseconds(dateTime) {
    const date = new Date(dateTime);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }

    return date.getTime();
}

export function minutesToMilliseconds(milliseconds) {
    return milliseconds * 60000;
}

const intervals = {};

export function startInterval(callback, intervalTime, intervalID) {
    if (isIntervalRunning(intervalID)) {
        console.error(`Interval "${intervalID}" is already running.`);
        return; // Exit early if interval already declared.
    }

    intervals[intervalID] = setInterval(callback, intervalTime);
    console.log(`Interval "${intervalID}" started.`);
}

export function stopInterval(intervalID) {
    if (!intervals[intervalID]) {
        console.error(`Interval "${intervalID}" is not currently running.`);
        return; // Exit early if interval not running.
    }

    clearInterval(intervals[intervalID]);
    delete intervals[intervalID];
    console.log(`Interval "${intervalID}" stopped.`);
}

export function isIntervalRunning(intervalID) {
    return !!intervals[intervalID]; // False if undefined.
}


// JSON libraries:

export async function createJsonFile(filePath, content) {
    console.log(`Writing JSON file to ${filePath}...`);
    try {
        fs.writeFileSync(filePath, JSON.stringify(content, null, 4), "utf-8");
        console.log("Success!")
    } catch (error) {
        throw new Error("Error writing JSON file", error);
    }
}

export async function parseJsonFile(filePath){
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function getObjectKeys(object, parentKey){
    let keys = []; 

    if (!object || typeof object !== "object"){
        return keys; // Returns empty keys if not object.
    }

    // If object is an array, iterate over items.
    if (Array.isArray(object)) {
        object.forEach((item, index) => {
            let fullkey = `${parentKey}[${index}]`;
            keys.push(fullkey);
            keys = keys.concat(getObjectKeys(item, fullkey));
        })
        return keys.sort();
    }

    for (let key in object) {
        if (!object.hasOwnProperty(key)) {
            continue; // Skips inherited properties.
        }
        let fullKey = parentKey ? `${parentKey}.${key}` : key;
        keys.push(fullKey);
        keys = keys.concat(getObjectKeys(object[key], fullKey));
    }
    return keys.sort();
}

// Returns true if objects are the same.
export function compareObjects(object1, object2) {
    let keys1 = getObjectKeys(object1);
    let keys2 = getObjectKeys(object2);
    
    if (keys1.length !== keys2.length) {
        return false;
    }

    return keys1.every((key, index) => key === keys2[index]); // Checks if all keys are the same, boolean result.
}

function isValidObject(obj, key) {
    return typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key]);
}

// Recursively merges objects without overwriting existing values from baseObj.
export function mergeObjects(baseObj, newObj) {
    for (const key in newObj) {
        if (!newObj.hasOwnProperty(key)) {
            continue; // Skip inherited properties
        }

        if (isValidObject(newObj, key)) { // The recursive part.
            if (!baseObj.hasOwnProperty(key)) {
                baseObj[key] = {};
            }
            mergeObjects(baseObj[key], newObj[key]);
        }

        if (!baseObj.hasOwnProperty(key)) { 
            // runs only if key doesn't exist in baseObj.
            baseObj[key] = newObj[key];
        }
    }
    return baseObj;
}

// Miscellaneous:

export function shutDown() {
    console.log("Shutting down...");
    process.exit();
}

export function addCharacterAtEndOfStringIfMissing(str, char) {
    if (str.endsWith(char)) {
        return str;
    }
    return str + char;
}

export function runCommandWithOutput(command) {
    console.debug(`Executing console command: ${command}`);

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                reject({ content: null, status: 'error' });
            } else if (stderr) {
                console.error(`Stderr: ${stderr}`);
                reject({ content: null, status: 'stderr' });
            } else {
                // return output
                resolve({ content: stdout.trim(), status: 'success' });
            }
        });
    });
}
