import express, { response } from 'express'
import MenuItems from '../models/MenuItem.model.js';
//used to handle routes.
const router = express.Router();

//route to add menu item
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

//route to get list of all menuitems
router.get("/", async(req, res)=> {
  try {
    // find() is a method in Mongoose used to search for documents in a collection.

    // In this case, MenuItem is a Mongoose model, and calling MenuItem.find() will query the MenuItem collection in MongoDB by default find() method shows all the documents of the collection.
    const data = await MenuItems.find();
    console.log('data fetched')
    res.status(200).json(data);

  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

//find menuItems by taste.
router.get('/:taste', async (req, res) => {
  try {
    const tasteType = req.params.taste;

    if (tasteType == 'sweet', tasteType == 'sour', tasteType == 'spicy') {
      // { taste: tasteType } tells MongoDB to find all documents in the MenuItem collection where the taste field matches the value stored in tasteType.
      const response = await MenuItems.find({ taste: tasteType });
      console.log('response fetched');
      res.status(200).json(response)
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// Imp concept of parameterized routes . So like dekho if i do /person so i will get all the details of the person but if i want ki /person/waiter that means i only want to get the data of person who is a waiter so in that case we will have to create this route but agar hum aese hi routes banate hue chale gye to bohot saare banane pad jayenge so here to resolve this we use parameterized routing , so when after / we write : to iske baad aap jo bhi likhoge that will become the variable.

// In the below case after : we have written id so id is a variable here which is being passed in the request so then req.params se hum req mein aane wale parameters ko get kar lenge .


//update menu item by it's id.
router.put('/:id', async (req, res)=>{
  try{
      const menuId = req.params.id; // Extract the id of Menu Item from the URL parameter
      const updatedMenuData = req.body; // Updated data for the Menu Item

      const response = await MenuItems.findByIdAndUpdate(menuId, updatedMenuData, {
          new: true, // Return the updated document
          runValidators: true, // Run Mongoose validation
      })

      if (!response) {
          return res.status(404).json({ error: 'Menu Item not found' });
      }

      console.log('data updated');
      res.status(200).json(response);
  }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
  }
})

//delete menu item by it's id.
router.delete('/:id', async (req, res) => {
  try {
    const menuId = req.params.id;
    

    //fetch that MenuItem from that menuId
    const response = await MenuItems.findByIdAndDelete(menuId);

    if (!response) {
      return res.status(404).json({error:"Menu item item not found"})
    }

    console.log('data delete');

    res.status(200).json({ success: 'Menu Deleted successfully ' });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
  })

  //exporting this router to get menuItemsroutes in server.js file
export default router;