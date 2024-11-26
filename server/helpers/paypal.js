const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:"Aa6jUCqUo0TlEUEZnK7ucu9u_8H0Jl6NRvlzNey7uYmgADW03WqhtDBG5IRDn-H1P5_ko7tXAenb1ut8",
  client_secret:"EEdLB8GwR9ZRbmGJ8zpkEKHQ93w5zJIuwSpfqUuHZ3zqWLW01a_o-XrkjgjltuMlV1DSoSqIkgFhtZVK",
});

module.exports = paypal;
