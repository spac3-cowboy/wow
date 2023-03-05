module.exports = class AppValidationError extends Error {
    constructor(message){
        super(message);
        this.name = "AppValidationError";
        console.log('Inside AppValidationError');
    }
}