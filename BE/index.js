import cors from "cors"

import { jwtDecode } from "jwt-decode";
import express from "express"
import axios from "axios"


const domain = "dev-u1gdkhrrw304d3qq.us.auth0.com"
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
    const id = req.params;
    // console.log(id)
    const stringie = JSON.stringify(id)
    const decoded = jwtDecode(stringie)
    return res.status(200).json(decoded)


})



app.get("/admin/:id", (req, res) => {
    const authHeader = req.headers.authorization;


    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwtDecode(token);
        console.log("decoded", decoded);

        const roles = decoded["https://dev-u1gdkhrrw304d3qq.us.auth0.com/roles"] || [];

        if (roles.includes('Report Auditor')) {
            console.log("admin");
            return res.json({ message: "welcome admin" });
        } else {
            console.log("noadmin");
            return res.json({ message: "welcome user" });
        }
    } catch (error) {
        console.error("Token decode error:", error);
        return res.status(400).json({ message: "Invalid token" });
    }
});

app.listen(4000, () => {
    console.log("listerning on 4000")
});