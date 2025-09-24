import Database from "better-sqlite3"

const  db = new Database("./data/database.sqlite")

db.prepare(`CREATE TABLE IF NOT EXISTS teams (id INTIGER PRIMARY KEY AUTOINCREMENT, name STRING, score INTEGER)`).run()

export const getTeams = () => db.prepare('SELECT * FROM teams').all()
export const getTeamById = (id) => db.prepare("SELECT * FROM teams WHERE id = ?").get(id)
export const saveTeam = (name, score) => db.prepare("INSERT INTO teams (name, score) VALUES (?, ?)").run(name,score)
export const updateTeam = (id, name, score) => db.prepare("UPDATE teams SET name=?, score=?, WHERE id = ?").run(name,score, id)
export const deleteTeam = (id) => db.prepare("DELETE FROM teams WHERE id=?").run(id)

const teams = getTeams()
if(!teams.length){
    saveTeam("Barcelona",60)
    saveTeam("Real Madrid",57)
    saveTeam("PSG",50)
    saveTeam("Machester United",10)
}