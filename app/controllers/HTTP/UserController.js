const Handler = lulu.use('app/errors/Handler');
const UserService = lulu.use('app/services/UserService');
const response = lulu.use('app/responses/Response');
const Event = lulu.use('app/responses/Event');

module.exports = {
    registerRegular : async function (req, res) {
        try{
            const newUser = await UserService.regularRegistration({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                repeatPassword: req.body.repeatPassword,
                baseRole: 'User'
            });
            return response.dispatch("Registration Successful.", {newUser}, res, 200); // wrap data in object to avoid confusion
        }
        catch(error){
            console.log(error,'errror..')
            return response.error(Handler(error), res);
        }
    },
    loginUser:async function (req,res){
        const {email,password} = req.body;
        try{
            const loggedInUser = await UserService.userLogin({email,password});

            return response.dispatch("Login successful.", {loggedInUser}, res, 200); 

        }catch(error){
            return response.error(Handler(error), res);
        }
    }





}