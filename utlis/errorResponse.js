//this is usd bcoz we  want to send the custom error codes

class ErrorResponse extends Error{

    constructor(message,statusCode){

        super(message);
        this.statusCode=statusCode;
    }
}
module.exports=ErrorResponse;