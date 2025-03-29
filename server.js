import express from 'express'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import passport from './auth/auth.js'

import personRoutes from './routes/PersonRoute.js'
import menuItemsRoutes from './routes/menuItemsRoutes.js'



//configuring the dotenv as it is mandatory .
dotenv.config();

const app = express();



app.use(bodyParser.json({}));

// Purpose: This initializes Passport and adds its functionality to your Express app.
// Why: Passport needs to be initialized before you can use any authentication strategies (like local, JWT, etc.).
// Where it goes: You usually place this right after your Express app is created.
app.use(passport.initialize());


// : This sets up an authentication middleware for handling local authentication (typically using a username and password).

// 'local' is the name of the strategy
// Here we are not using sessions so that's why we have set session:false.
// You can apply localAuthMiddleware to routes that require authentication

const localAuthMiddleware = passport.authenticate('local',{session:false})

app.get('/', (req, res) => {
  console.log("Welcome to our Hotel! ")
  res.send("hello ji");
})

//now dekho jab bhi koi api /person karke call hogi to personRoutes mein /person/ jo bhi hai iske aag add hoga and same for menu route.

//like in menuitems and person route har route k aage /menu tha , aur in person route har route k aage /menu tha so we added /person and /menu here only ab by default ye yahi se add ho gye hai we can remove /person , /menu from personRoutes and menuItemsRoutes issi liye you can see in menuItemsRoutes and PersonRoutes in routes folder we have defined routes like '/' so which means depending upon kika route hai /person ,/menu automatically aa jayega yaha se.
app.use('/person',localAuthMiddleware, personRoutes);
app.use('/menu', menuItemsRoutes);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`listening to the port ${PORT}`)
});