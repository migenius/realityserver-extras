/******************************************************************************
 * Copyright 2010-2021 migenius pty ltd, Australia. All rights reserved.
 *****************************************************************************/

const float_tolerance = 10e-8;

expect.extend({
    toBeMatrix4x4(received, expected) {
        const pass = expected.equal(received, float_tolerance);
        if (pass) {
            return {
                message: () =>
                    `expected ${JSON.stringify(received)} to be ${JSON.stringify(expected)}`,
                pass: true,
            };
        } else {
            return {
                message: () => {
                    let message = '';
                    [ 'xx', 'xy', 'xz', 'xw',
                        'yx', 'yy', 'yz', 'yw',
                        'zx', 'zy', 'zz', 'zw',
                        'wx', 'wy', 'wz', 'ww' ].forEach(prop => {
                        if (received[prop] === undefined) {
                            message += `  ${prop} is undefined, should be ${expected[prop]}\n`;
                        } else if (Math.abs(expected[prop] - received[prop]) > float_tolerance ) {
                            message += `  ${prop} is ${received[prop]}, should be ${expected[prop]}\n`;
                        }
                    });
                    return message;
                },
                pass: false,
            };
        }
    },
    toBeVector4(received, expected) {
        const pass = expected.equal(received, float_tolerance);
        if (pass) {
            return {
                message: () =>
                    `expected ${JSON.stringify(received)} to be ${JSON.stringify(expected)}`,
                pass: true,
            };
        } else {
            return {
                message: () => {
                    let message = '';
                    [ 'x', 'y', 'z', 'w' ].forEach(prop => {
                        if (received[prop] === undefined) {
                            message += `  ${prop} is undefined, should be ${expected[prop]}\n`;
                        } else if (Math.abs(expected[prop] - received[prop]) > float_tolerance ) {
                            message += `  ${prop} is ${received[prop]}, should be ${expected[prop]}\n`;
                        }
                    });
                    return message;
                },
                pass: false,
            };
        }
    },
    toBeVector3(received, expected) {
        const pass = expected.equal(received, float_tolerance);
        if (pass) {
            return {
                message: () =>
                    `expected ${JSON.stringify(received)} to be ${JSON.stringify(expected)}`,
                pass: true,
            };
        } else {
            return {
                message: () => {
                    let message = '';
                    [ 'x', 'y', 'z' ].forEach(prop => {
                        if (received[prop] === undefined) {
                            message += `  ${prop} is undefined, should be ${expected[prop]}\n`;
                        } else if (Math.abs(expected[prop] - received[prop]) > float_tolerance ) {
                            message += `  ${prop} is ${received[prop]}, should be ${expected[prop]}\n`;
                        }
                    });
                    return message;
                },
                pass: false,
            };
        }
    },
    toBeQuaternion(received, expected) {
        const pass = expected.equal(received, float_tolerance);
        if (pass) {
            return {
                message: () =>
                    `expected ${JSON.stringify(received)} to be ${JSON.stringify(expected)}`,
                pass: true,
            };
        } else {
            return {
                message: () => {
                    let message = '';
                    [ 'x', 'y', 'z', 'w' ].forEach(prop => {
                        if (received[prop] === undefined) {
                            message += `  ${prop} is undefined, should be ${expected[prop]}\n`;
                        } else if (Math.abs(expected[prop] - received[prop]) > float_tolerance ) {
                            message += `  ${prop} is ${received[prop]}, should be ${expected[prop]}\n`;
                        }
                    });
                    return message;
                },
                pass: false,
            };
        }
    },
    toBeEuler(received, expected) {
        const pass = expected.equal(received, float_tolerance);
        if (pass) {
            return {
                message: () =>
                    `expected ${JSON.stringify(received)} to be ${JSON.stringify(expected)}`,
                pass: true,
            };
        } else {
            return {
                message: () => {
                    let message = '';
                    [ 'x', 'y', 'z' ].forEach(prop => {
                        if (received[prop] === undefined) {
                            message += `  ${prop} is undefined, should be ${expected[prop]}\n`;
                        } else if (Math.abs(expected[prop] - received[prop]) > float_tolerance ) {
                            message += `  ${prop} is ${received[prop]}, should be ${expected[prop]}\n`;
                        }
                    });
                    if (received.order === undefined) {
                        message += `  order is undefined, should be ${expected[prop]}\n`;
                    } else if (received.order !== expected.order) {
                        message += `  order is ${received.order}, should be ${expected.order}\n`;
                    }
                    return message;
                },
                pass: false,
            };
        }
    }
});
