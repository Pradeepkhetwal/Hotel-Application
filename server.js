import express from 'express'
import bodyParser from 'body-parser';
import personRoutes from './routes/PersonRoute.js'
import menuItemsRoutes from './routes/menuItemsRoutes.js'

import db from './db/db.js';
const app = express();



app.use(bodyParser.json({}));

app.get('/', (req, res) => {
  console.log("Welcome to our Hotel! ")
})

//now dekho jab bhi koi api /person karke call hogi to personRoutes mein /person/ jo bhi hai iske aag add hoga and same for menu route.

//like in menuitems and person route har route k aage /menu tha , aur in person route har route k aage /menu tha so we added /person and /menu here only ab by default ye yahi se add ho gye hai we can remove /person , /menu from personRoutes and menuItemsRoutes issi liye you can see in menuItemsRoutes and PersonRoutes in routes folder we have defined routes like '/' so which means depending upon kika route hai /person ,/menu automatically aa jayega yaha se.
app.use('/person', personRoutes);
app.use('/menu', menuItemsRoutes);
const PORT = 5755;
app.listen(PORT, () => {
  console.log(`listening to the port ${PORT}`)
});