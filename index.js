const cors = require("cors");
var express = require("express");
var multer = require("multer");
var axios = require("axios");
const fs = require("fs");
const { log } = require("console");

var app = express();
app.use(express.static("./det"));
app.use(cors());
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./test");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });
// var multipleUpload = multer({storage: storage}).array('userPhoto',2);
// app.use(express.static(__dirname + '/public'));
app.use("/uploads", express.static("test"));

app.post("/v2/image/diff", upload.array("image", 2), async (req, res) => {
  console.log(req.files[0].filename);
  console.log(req.files[1].filename);
  var spawn = require("child_process").spawn;
  var process = spawn("python3", [
    "./diffChecker.py",
    req.files[0].filename,
    req.files[1].filename,
  ]);
  process.stdout.on("data", async function (data) {
    let result = String(data.toString()[0]);
    if (result === "o") {
      console.log("enteres");
      let buzzer = buzzerHandler();
      if (!buzzer) {
        let buzzer = buzzerHandler();
      }
    }
    res.send(data);
  });
});

app.post("/v2/image/diff/esp", upload.array("image"), async (req, res) => {
  var spawn = require("child_process").spawn;
  var process = spawn("node", ["test.js"]);
  process.stdout.on("data", function (data) {
    var process = spawn("python3", ["./diffChecker.py", "", "screenshot.jpeg"]);
    process.stdout.on("data", async function (data) {
      console.log(data.toString());
      let result = String(data.toString()[0]);
      if (result === "o") {
        console.log("enteres");
        let buzzer = buzzerHandler();
        if (!buzzer) {
          let buzzer = buzzerHandler();
        }
      }
      res.send(data);
    });
  });
});

app.get("/test", async (req, res) => {
  res.send("It's working");
});

function buzzerHandler() {
  axios
    .get("http://35.153.246.3:8080/v1/buzzerHandler", {
      params: {
        buzzer: 1,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
