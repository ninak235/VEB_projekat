const fs = require("fs");
const path = require("path");
const { Readable } = require("stream");

const FileUploadService = {
  uploadFile: function (req, res) {
    const uploadedInputStream = req.files.file.data;
    const fileDetail = req.files.file;

    const fileLocation = path.join(
      path.resolve(__dirname) +
        "VEB-projekat/frontend/rental/src/assets/objectLogo" +
        +Math.floor(Math.random() * 100) +
        1 +
        ".png"
    );

    try {
      const out = fs.createWriteStream(fileLocation);
      const readableStream = Readable.from(uploadedInputStream);
      readableStream.pipe(out);
      out.on("finish", function () {
        const output = "File successfully uploaded to: " + fileLocation;
        res.status(200).send(output);
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error uploading file");
    }
  },

  uploadPicture: function (req, res) {
    const uploadedInputStream = req.files.file.data;
    const fileDetail = req.files.file;

    const fileLocation = path.join(
      path.resolve(__dirname) +
        "VEB-projekat/frontend/rental/src/assets/objectLogo" +
        +Math.floor(Math.random() * 100) +
        1 +
        ".png"
    );

    try {
      const out = fs.createWriteStream(fileLocation);
      const readableStream = Readable.from(uploadedInputStream);
      readableStream.pipe(out);
      out.on("finish", function () {
        const output = "File successfully uploaded to: " + fileLocation;
        res.status(200).send(output);
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error uploading file");
    }
  },

  getPath: function (req, res) {
    return Startup.path;
  },
};

module.exports = FileUploadService;
