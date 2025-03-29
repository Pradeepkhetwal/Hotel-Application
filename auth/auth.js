import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Person from '../models/Person.model.js';


//here we write the logic for our local strategy , inside a aysnc function which is compulsary and inside it 3 parameter pass

/* passport.use()

This is a method provided by Passport.js to register a new authentication strategy.

It tells Passport, "Hey, I’m going to use this strategy to authenticate users."

Without this, Passport won’t know how to handle authentication requests


new LocalStrategy(...)
This creates a new instance of the LocalStrategy, which is specifically designed for username/password authentication.

async (username, password, done) => 
  This is an asynchronous arrow function that defines how Passport should handle the authentication process.
  
  username: The username submitted by the user (from a login form).

password: The password submitted by the user.

done: A callback function provided by Passport to indicate whether the authentication was successful or not.

done takes 3 parameters 
done(error, user, info);
error: If an error occurred (like a database issue), you pass the error object here. If no error is encountered you pass null.

user: If authentication is successful, you pass the authenticated user object here.

info: An optional object used to provide additional information, like error messages ({ message: 'Incorrect password.' }).


If authentication succeeds, you call done(null, user).

If authentication fails, you call done(null, false, { message: 'Error' }).

If there’s an error (like a database issue), you call done(error).
*/

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await Person.findOne({ username });

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (isPasswordMatch) {
      return done(null, user);
    }
    else {
      return done(null,false,{message:'Incorrect password'})
    }
  } catch (error) {
    return done(error);
  }
}))

export default passport;