import express from 'express';
import { getfunctions, getdepartments, getuniqueroles, getpossiblemovements } from './db.js';
import cors from 'cors';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Use the cors middleware to enable CORS
app.use(cors());

// Define your routes and middleware here

// getting functions
app.get("/functions", async (req, res) => {
    const functions = await getfunctions();
    res.send(functions);
    console.log(functions);
});

app.get("/departments/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const departments = await getdepartments(id);
    res.send(departments);
    console.log(departments);
});

app.get("/uniqueroles/:functionId/:departmentId", async (req, res) => {
    const fnid = req.params.functionId;
    const depid = req.params.departmentId;

    const uniqueroles = await getuniqueroles(fnid, depid);
    res.send(uniqueroles);
    console.log(uniqueroles);
});

app.get("/possiblemove/:functionId/:departmentId/:uniqueroleId", async (req, res) => {
    const fnid = req.params.functionId;
    const depid = req.params.departmentId;
    const unqpid = req.params.uniqueroleId;


    const possible_movements = await getpossiblemovements(fnid, depid, unqpid);
    res.send(possible_movements);
    console.log(possible_movements);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
