import express from 'express'
import bodyParser from 'body-parser';

const app = express();


app.use(bodyParser.json({}));

app.get('/', (req, res) => {
  console.log("Welcome to our Hotel! ")
})



app.listen(PORT, () => {
  console.log(`listening to the port ${PORT}`)
});