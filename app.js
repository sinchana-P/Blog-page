const express = require('express'); //returns function
const morgan = require('morgan');
const mongoose = require('mongoose'); //it's an object
//const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://Sinchana:Sinchu333@nodetuts.i6dam.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true}) // mongoose is going to go out and connect to that database (bdURI). and 2nd parameter is option just to avoid deprecation Warning. 
   .then((result) => app.listen(3000)) // (console.log('connected to db'))  above is an asnynchronous task ,it goes out and it takes some time to do & therefore it returns something like promise.
   .catch((err) => console.log(err));

//register for view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true})); //this basically takes all the URL encoded data that comes along from the form , and passes that into an object that we can use on the request object (in post req handler).
app.use(morgan('dev'));


/*
//mongoose and mongo sandbox routes    -->just to test out the interaction of blog model with database.
app.get('/add-blog', (req, res) => {   // /add-blog --> this is going to be used to add a blog to the collection.   & we'll fire a callback when a request comes in , taking the request object and the response object
    const blog = new Blog({
        title: 'new blog 2',                 // create a new instance of blog documents and save that to blog's collection in the database.
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });                       

    blog.save()              //to save this data to database. & it's an asynchronous method so use then method.
       .then((result) => {
           res.send(result)
       })
       .catch((err) => {
           console.log(err);
       });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
      .then((result) => {
          res.send(result);
      })
      .catch((err) => {
          console.log(err);
      });
});


// for single blog
app.get('/single-blog', (req, res) => {
    Blog.findById('6287d73b277c2f4286f1a99e')   // asynchronous fun
       .then((result) => {
           res.send(result);
       })
       .catch((err) => {
        console.log(err);
    });
})

// listen for express
//app.listen(3000);

*/


//routes (basic routes)
app.get('/', (req, res) => {
    res.redirect('/blogs');   //line 83
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'ABOUT' });
});

/*
//blog routes  //shifted to blogRoutes.js
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1})  // -1 to keep newest blog above
      .then((result) => {
          res.render('index', {title: 'All Blogs', blogs: result})
      })
      .catch((err) => {
          console.log(err);
      });
});

      //post request
app.post('/blogs',(req, res) => {
   //  console.log(req.body);     //req.body --> can access this and tht contains all the information we need from the web form. 
    const blog = new Blog(req.body);

    blog.save()
      .then((result) => {
          res.redirect('/blogs');    //to display new blogs in home page
      })
      .catch((err) => {
          console.log(err);
      });
});

app.get('/blogs/:id', (req,res) => {
    const id = req.params.id;
   // console.log(id);
   Blog.findById(id)
     .then((result) => {
         res.render('details', { blog: result, title: 'Blog Details'});
     })
     .catch((err) => {
         console.log(err);
     });
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
      .then((result) => {
          res.json({ redirect: '/blogs' })
      })
      .catch((err) => {
        console.log(err);
    });

})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'CREATE A NEW BLOG' });
});

*/

//blog routes
app.use('/blogs', blogRoutes); // it applies all of the handlers (get,post) to the app here .  // '/blogs' scopes to specific URL.

// 404 pages
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});