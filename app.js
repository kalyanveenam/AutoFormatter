const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(express.json());
app.use("/static", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const fs = require("fs");
const indexpath = path.join(__dirname, "./public/home.html");
app.get("/", (req, res) => {
  res.sendFile(indexpath);
});
app.post("/getjson", (req, res) => {
  console.log(JSON.stringify(req.body));

  var inputJson = JSON.parse(fs.readFileSync(__dirname + "/CreateFlow.json"));
  inputJson.pageProcessors[0].qa__import = req.body.qa__import;
  inputJson.pageGenerators[0].qa__export = req.body.qa__export;
  fs.writeFileSync(__dirname + "/CreateFlow.json",JSON.stringify(inputJson));
  res.download(__dirname + "/CreateFlow.json",'filename.json',(err)=>{
    if(!err)
    console.log('done');
  });
});
app.listen("8001", () => {
  console.log("App is up and running");
});
