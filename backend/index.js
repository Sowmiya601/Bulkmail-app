const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer"); //install nodemailer
const mongoose = require("mongoose")

const app = express()
app.use(cors())

app.use(express.json())


mongoose.connect("mongodb+srv://Sowmiya:12345@cluster0.i2veiye.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(function () {
  console.log("Connected to DB")
}).catch(function () { console.log("Failed to connect") })

const credential = mongoose.model("credential", {}, "bulkmail")





app.post("/sendemail", function (req, res) {

  var msg = req.body.msg
  var emailList = req.body.emailList

credential.find().then(function (data) {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: data[0].toJSON().user,
      pass: data[0].toJSON().pass,
    },
  });

    new Promise(async function (resolve, reject) {
    try {
      for (var i = 0; i < emailList.length; i++) {
        await transporter.sendMail(
          {
            from: "sowmilatha2206@gmail.com",
            to: emailList[i],
            subject: "A message from Bulk Mail App",
            text: msg
          },
        )
        console.log("Email sent to:" + emailList[i])

      }
      resolve("Success")
    }
    catch (error) {
      reject("Failed")
    }
  }).then(function () {
    res.send(true)
  }).catch(function () {
    res.send(false)
  })

}).catch(function (error) {
  console.log(error)
})


})

// The purpose of using try is to identify if there is any error while sending multiple emails.  
// If we directly use res.send, the email will be sent immediately.  
// So, we are using a promise along with async & await to handle it properly.

app.listen(5000, function () {
  console.log("server started....")
})