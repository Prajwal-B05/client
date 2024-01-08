const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
//middleware
app.use(cors());
app.use(express.json());

//routes

//create
app.post("/todos",async(req, res) =>
{ try
{
    const{description} = req.body;
    const newTodo = await pool.query(" INSERT INTO todo(description) VALUES($1) RETURNING *" , [description]);
    res.json(newTodo.rows[0]);
}

catch (err)
{
    console.error(err.message);
}
});
//get

app.get("/todos" , async (req, res) =>{
try
{
  const allTodos= await pool.query("SELECT * FROM todo");
  res.json(allTodos.rows);
}
catch (err)
{
    console.error(err.message);
}
});

//get from id
app.get("/todos/:id", async (req, res)=> {
 try
 {
 const {id} = req.params;
 const todo = await pool.query("SELECT * FROM todo WHERE todo_id =$1",[id]);
 res.json(todo.rows);
 } 
 catch (err)
 {
    console.error(err.message);
 }
});
//update 
app.put("/todos/:id", async (req, res)=>
{
    try{
 const{id} = req.params.id;
 const{description} = req.body;
 const updatetodo = await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2",[description,id]);
 res.json("Congratulations your Todo has updated successfully");
    }
    catch (err)
    {
        console.error(err.message);
    }
});

//delete
app.delete("/todos/:id", async(req, res) =>{
    try{
     const {id} = req.params;   
     const deletetodo = await pool.query("DELETE FROM todo WHERE todo_id =$1",[id]);
     res.json("Todo deleted successfully");
    }
    catch (err)
    {
        console.error(err.message);
    }
});

app.listen(5000,()=>{
console.log('listening on port 5000');
});