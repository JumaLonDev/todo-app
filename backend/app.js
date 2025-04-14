import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("¡Backend del TO-DO activo! 🚀");
});

app.listen(3000, () => console.log("Server in http://localhost:3000"));
