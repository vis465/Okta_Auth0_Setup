import cors from "cors"

import { jwtDecode } from "jwt-decode";
import express from "express"
import axios from "axios"


const domain="dev-u1gdkhrrw304d3qq.us.auth0.com"
const app = express()
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,

}))

app.get("/profile", (req, res) => {
    res.json({
        message: "access granted",
        user: req.auth.payload
    })
})
app.get("/data/:id", (req, res) => {
    const id=req.params;
    // console.log(id)
    const stringie=JSON.stringify(id)
    const decoded=jwtDecode(stringie)
return res.status(200).json(decoded)

   
})



app.get("/admin/:id", (req, res) => {
     const id=req.params;
    console.log(id)
    const stringie=JSON.stringify(id)
    const dedicate=jwtDecode(stringie)
    console.log("decoded",dedicate)
    // if (dedicate."dev-u1gdkhrrw304d3qq.us.auth0.com/roles".contains("admin")){

    // return res.json({ message: "welcome admin" });}
    // else{
    //     return res.json({message:"welcome user"})
    // }
    return res.status(200).json({message:"hello"
    })
})

app.listen(4000, () => {
    console.log("listerning on 4000")
});