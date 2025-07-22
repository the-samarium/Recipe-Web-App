const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

const { checkuser, requireAuth } = require('./middlewares/middleware');
const authRoutes = require('./routes/authRoutes');
const { recipe_post, deleteRecipe, mySpace } = require('./controllers/reciepeController');
const {Recipe} = require('./model/recipeSchema'); 

// Database
mongoose.connect('mongodb://127.0.0.1:27017/JWT')
  .then(() => console.log("CONNECTED TO DB"))
  .catch(err => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(cookieParser());

app.set('view engine', 'ejs');

// Custom middleware
app.use(checkuser);

// Routes
app.get('/', (req, res) => {
  res.render('landing');
});


app.get('/home', requireAuth, async (req, res) => {
  try {
    const recipes = await Recipe.find(); 
    res.render('home', { recipes });     
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.get('/home/new', requireAuth, (req, res) => {
  res.render('new');
});

// View single recipe
app.get('/home/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send('Recipe not found');
    res.render('viewPage', { recipe });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});


app.post('/home/new', recipe_post);
app.get('/home/:id', deleteRecipe)  //not workingt


// Auth Routes
app.use(authRoutes);

// Start server
app.listen(3000, () => {
  console.log("Hello from server JWT");
});
