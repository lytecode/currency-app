import express from 'express';

const app = express();

app.use(express.json());
app.get('/api', (req, res) => {
    res.json("Welcome to currency API");
})

export default app;
