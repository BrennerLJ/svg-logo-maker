//Imports the shape classes from the 'shape.js' file
const { Circle, Square, Triangle } = require("./shapes");

//Circle shape logo
describe('Circle', () => {
    test('renders correctly', () => {
        const shape = new Circle();
        var color = 'purple';
        shape.setColor(color);
        expect(shape.render()).toEqual(`<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${color}">`);
    });
});
    //Square shape logo
    describe('Square', () => {
        test('renders correctly', () => {
            const shape = new Square();
            var color = 'pink';
            shape.setColor(color);
            expect(shape.render()).toEqual(`<rect x="50" height="200 width="200" fill="${color}">`);
        });
    });

        //Triangle shape logo
        describe('Triangle', () => {
            test('renders correctly', () => {
                const shape = new Triangle();
                var color = 'green';
                shape.setColor(color);
                expect(shape.render()).toEqual(`<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="${color}">`);
            });
});