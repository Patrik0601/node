import express from "express"
import * as db from "./util/database.js"

const PORT = 3000
const app = express()

app.use(express.json())

app.get("/teams",(req,res)=>{
const teams = db.getTeams()
res.status(200).json(teams)
})

app.get("/teams/:id",(req,res)=>{
const team= db.getTeamById(+req.params.id)
if (!team) {
    return res.status(404).json({message: "Not found"})
}
res.status(200).json(team)
})

app.post("/teams", (req, res) => {
    const {name, score} = req.body;
    if(!name || !score){
        return res.status(400).json({message: "Missing some data"})
    }
    const saveResult = db.saveTeam(name, score)
    res.status(201).json({id: saveResult.lastInsertRowid, name, score})
})

app.put("/teams/:id", (req, res) => {
    const team= db.getTeamById(+req.params.id)
    if (!team) {
    return res.status(404).json({message: "Not found"})
    }
    const {name, score} = req.body;
    if(!name || !score){
        return res.status(400).json({message: "Missing some data"})
    }
    db.updateTeam(team.id, name, score);
    team = db.getTeamById(+req.params.id);
    res.status(200).json(team)
})

app.delete("/teams/:id",(req,res)=>{
    const id = +req.params.id;
    const team = db.getTeamById(id);
    if (!team) {
        return res.status(404).json({message: "Not found"})
    }
    db.deleteTeam(id)
    res.status(200).json({message: "Team delete success"})
})


app.listen(PORT, ()=>{
    console.log(`Server fut a ${PORT} porton` )
})