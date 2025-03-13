const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const SerialPort = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const app = express();
const port = 5000;
const arduinoPort = "/dev/ttyUSB0"; // Ajusta según el puerto del Arduino

app.use(cors());
app.use(bodyParser.json());

let serial = new SerialPort(arduinoPort, { baudRate: 9600 });
let parser = serial.pipe(new ReadlineParser());

app.post("/set-power", (req, res) => {
  const potencia = req.body.potencia;
  console.log(`Recibido: ${potencia}`);
  serial.write(potencia + "\n");
  res.send("Potencia enviada al Arduino");
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
