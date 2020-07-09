const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

/*To use body-parser*/
app.use(bodyParser.urlencoded({ extended: true }));

/*To use css and images linked in a file html*/
app.use(express.static("Public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;

  // data that will be sent to the mailchimp list.
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
          LNAME: lastName
        }
      }
    ]
  };

  // transform the data object to a string.

  var jsonData = JSON.stringify(data);

  //Option is the object to pass to request where you put the api the method that default is get and the authorization with the body at the end
  //whit the data file

  const options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/371b4b98c5",
    method: "POST",
    headers: {
      Authorization: "Michele f9f48d4d82a94a748a29b82546f650fe-us20"
    },
    body: jsonData
  };

  // the request function take the option object and a function to handle the situation
  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || "0.0.0.0", function() {
  console.log("Server Started");
});

//API KEY
/*f9f48d4d82a94a748a29b82546f650fe-us20*/

// LIST ID
//371b4b98c5
