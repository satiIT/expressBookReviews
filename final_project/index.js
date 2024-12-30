const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
app.use(express.json());

app.use("/customer", session({
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true
}));

// Authentication mechanism
app.use("/customer/auth/*", function auth(req, res, next) {
  if (req.session && req.session.token) {
    jwt.verify(req.session.token, 'your_jwt_secret', (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

const PORT = 5000;
app.use("/customer", customer_routes);
app.use("/", genl_routes);

// Add the register and login routes to the main application
app.use("/", customer_routes);

app.listen(PORT, () => console.log("Server is running"));
