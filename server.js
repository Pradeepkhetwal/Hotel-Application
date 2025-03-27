import express from 'express'
import bodyParser from 'body-parser';
import MenuItems from './models/MenuItem.model';
const app = express();

//used to handle routes.
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const data = req.body;
    //here using new keyword we can create instance(document) of MenuItems model. Here we have passed data(js object) that will fill the data  of the fields defined in the MenuItems model.
    const newMenu = new MenuItems(data);


    //save() method is used to save the newly created document in the database.
    //Using the await keyword makes JavaScript wait for the Promise to resolve (or reject) before moving on to the next line of code.Now if the promise is resolved we will get the document in the reponse and if it is rejected then an error will be thrown and it will move directly to the catch block.
    const response = await newMenu.save();
    res.status(200).json(response);
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server Error" });
  }
})

router.get("/", async(req, res)=> {
  try {
    // find() is a method in Mongoose used to search for documents in a collection.

    // In this case, MenuItem is a Mongoose model, and calling MenuItem.find() will query the MenuItem collection in MongoDB by default find() method shows all the documents of the collection.
    const data = await MenuItems.find();
    console.log('data fetched')
    res.status(200,json(data))

  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get('/taste', async (req, res) => {
  try {
    const tasteType = req.params.taste;

    if (tasteType == 'sweet', tasteType == 'sour', tasteType == 'spicy') {
      // { taste: tasteType } tells MongoDB to find all documents in the MenuItem collection where the taste field matches the value stored in tasteType.
      const response = await MenuItmes.find({ taste: tasteType });
      console.log('response fetched');
      res.status(200).json(response)
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.use(bodyParser.json({}));

app.get('/', (req, res) => {
  console.log("Welcome to our Hotel! ")
})



app.listen(PORT, () => {
  console.log(`listening to the port ${PORT}`)
});