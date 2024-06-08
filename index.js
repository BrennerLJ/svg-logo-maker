// List of all dependencies
const fs = require('fs');
const inquirer = require('inquirer');
const { Circle, Square, Triangle } = require("./lib/shapes");

// Constructing the logo shape, shape color, text, and text color
class Svg {
    constructor() {
        this.textElement = '';
        this.shapeElement = '';
    }

    render() {
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
    }

    setTextElement(text, color) {
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
    }

    setShapeElement(shape) {
        this.shapeElement = shape.render();
    }
}

// User answers prompts and inputs to select how their logo will look
const questions = [
    {
        type: "input",
        name: "text",
        message: "TEXT: What text do you want on your logo? Up to 3 characters:",
    },
    {
        type: "input",
        name: "text-color",
        message: "TEXT COLOR: Enter a color keyword OR a hexidecimal number:",
    },
    {
        type: "input",
        name: "shape-color",
        message: "SHAPE COLOR: Enter a color keyword OR a hexidecimal number:",
    },
    {
        type: "list",
        name: "pixel-image",
        message: "Which shape would you like?: ",
        choices: ["Circle", "Square", "Triangle"],
    },
];

// Writes the file for the svg logo
function createLogo(svgString, fileName) {
    fs.writeFile(fileName, svgString, (err) => {
        if (err) throw err;
        console.log("Generating logo.svg");
    });
}

// Function to initialize questions and creation of the svg logo
async function init() {
    try {
        console.log('Starting init');
        
        // Prompts user for their answers
        const answers = await inquirer.prompt(questions);

        // Defining elements needed for logo
        let svgString = '';
        const svgFile = 'logo.svg';
        const userShapeType = answers['pixel-image'];
        const userShapeColor = answers['shape-color'];
        const userFontColor = answers['text-color'];
        const userText = answers['text'];

        let userShape;
        if (userShapeType === 'Square') {
            userShape = new Square();
        } else if (userShapeType === 'Circle') {
            userShape = new Circle();
        } else if (userShapeType === 'Triangle') {
            userShape = new Triangle();
        } else {
            console.log('Invalid shape!');
            return;
        }

        userShape.setColor(userShapeColor);

        const svg = new Svg();
        svg.setTextElement(userText, userFontColor);
        svg.setShapeElement(userShape);
        svgString = svg.render();

        console.log('Displaying shape:\n\n' + svgString);
        console.log('Shape generation complete!');
        console.log('Writing shape to file...');

        createLogo(svgString, svgFile);
    } catch (err) {
        console.error(err);
    }
}

init();
