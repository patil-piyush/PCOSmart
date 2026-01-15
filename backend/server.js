require(`dotenv`).config();
const express = require(`express`);
const connectDB = require(`./config/db`);


const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get(`/`, (req, res) => {
    return res.status(200).json({ message: 'Server is running!!' });
});


app.listen(PORT, () => console.log(`server is running on Port - ${PORT}`));