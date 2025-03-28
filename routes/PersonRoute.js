import express from 'express'
import Person from '../models/Person.model.js';

const router = express.Router();

//add a person route.
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();

    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

//get all persons route.
router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched")
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

//get  persons by their role.
router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType; // // Extract the work type from the URL parameter
    // now user kuch bhi pass kar skta hai means workType can be valid or invalid so we will have to cross check it so for that we ensure it using if condition.s
    if(workType == 'chef' || workType == 'manager' || workType == 'waiter' ){
        const response = await Person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response);
    }else{
        res.status(404).json({error: 'Invalid work type'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal Server Error"})
  }
})

//update person details by their id.
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;

    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,
      runValidators:true
    })

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('data updated');
    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

//delete person by id.
router.delete('/:id', async (req, res) => {

  try {
    const personid = req.params.id;

    const response = await Person.findByIdAndDelete(personid);
    if (!response) {
      return res.status(404).json({ error: 'Person not found' })
    }
    console.log('data delete');
    res.status(200).json({ message: 'person Deleted Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
)
//   //exporting this router to get Personroute in server.js file
export default router;