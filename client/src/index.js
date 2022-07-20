import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./style.css"
/*
import app from "../backend/server"
import mongodb from "mongodb"
import dotenv from "dotenv"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.HABIT_DB_URI,
    {
      poolSize: 50,
      wtimeout: 2500,
      useNewUrlParse: true  
    }
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
 
    .then(async client => {
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
    })}
    ))



    */
   
//ReactDOM.render(<App/>, document.getElementById("root"))

//New render method

ReactDOM.createRoot(document.getElementById("root")).render(<App/>)