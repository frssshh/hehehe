const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');
 
const config = {
  channelAccessToken: "bDr2S3ae4QXGP1uSgeQvf2eYrPTY+q8VVOhEi1EZqn+G9ioezD5xyVO5LqBCwxM51TnEcJSQP01tjoI6rxRfuxwXe9uYr3uexrO68ixvOUBV7PZn1uyciv8awUzJFisbkc+SPXsGKui1Vi7RroUyZAdB04t89/1O/w1cDnyilFU=",
  channelSecret: "7ec6282be8c0c8ff29b1de2a499fce93",
};
 
// create LINE SDK client
const client = new line.Client(config);
const app = express();
 
// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((e)=>{
      console.log(e);
    });
 
});
 
function handleEvent(event) {
 
    if(event.message.text == "hai"){
      const echo = { type: 'text', text: "Halo juga :)·" };
      return client.replyMessage(event.replyToken, echo);
    }
 
    const echo = { type: 'text', text: "Saya tidak mengerti, saya simpan dulu" };
    return client.replyMessage(event.replyToken, echo);
}
 
// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
