const express = require("express");
const cors = require("cors");
const { connectdb } = require("./pg");
const { initCollections } = require("./Collections");
const signupRoute = require("./routes/Signup");
const Login = require("./routes/Login");
const Book=require("./routes/Book")
const BooksaveAndDelete=require("./routes/BooksaveAndDelete")
const Addbooks=require("./routes/Addbooks")
const Viewbooks=require("./routes/Viewbooks")
const Bookinfo=require("./routes/Bookinfo")
const reviewrating=require("./routes/Review_Rating")
const Userreview=require("./routes/Userreview")
const allReview=require("./routes/allReview")

const app = express();


app.use(cors()); 
app.use(express.json());


app.use(signupRoute);
app.use(Login);
app.use(Book);
app.use(BooksaveAndDelete);
app.use(Addbooks);
app.use(Viewbooks);
app.use(Bookinfo);
app.use(reviewrating);
app.use(Userreview)
app.use(allReview)

async function startApp() {
  await connectdb();

  await initCollections();

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startApp();
