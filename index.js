const express = require("express");
const fs = require("fs");
const path = require("path");
const visitors = require('./visitors.json')
const app = express();

app.get("/",(req,res)=>{
  res.write("Welcome")
  res.end()
})

app.get("/visitors", (req, res) => {
  res.status(200);
  let initdata = fs.readFileSync(path.resolve(__dirname, "visitors.json"));
  let count = JSON.parse(initdata);
  console.log(count.count + 1);
  let data = JSON.stringify({ count: count.count + 1 });
  fs.writeFileSync("visitors.json", data);
  res.json(visitors)
  res.end();
});

app.get("/*", (req, res) => {
  res.write("404")
  res.end();
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});
