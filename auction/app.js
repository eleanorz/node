
var http = require('http');
var fs = require('fs');
var io = require('socket.io');
var server = http.createServer(function (request, response){
 //set path of index page
 if(request.url == "/index.html"){
  file_path = "index.html"
  //load needed pages and static files
  fs.readFile(file_path, function(error, data){
   response.writeHead(200, {"Content-Type": "text/html"});  
   response.write(data);
   response.end();
  });
 } else {
  response.writeHead(500, {"Content-Type": "text/html"});
  response.write('File not found!!');
  response.end();
 }  
}); 
//////////////end of server things

///start of auction bids

function Auction(item_name, bid_amt, winner){
  this.name = item_name; 
  this.bid = bid_amt;
  this.winner = 'be first to bid';

}

var chair = new Auction('chair', 400);
var hat = new Auction('hat', 30);

var auctions = [chair, hat]
console.log(auctions);

//have socket io listen to server
var sockets = io.listen(server);
//listening to connection event
sockets.on('connection', function (socket){
 //listening to send message event
 socket.on('get_actions', function (message){
  socket.emit('give_auctions', auctions);
  console.log('###################################add to array JS')
  socket.broadcast.emit('give_auctions', auctions);
  console.log('emited auctions')
  //socket.broadcast.emit('display_message', message);
 });
 socket.on('add_new', function (auction){
  console.log('#########################add new auction ################')
  auctions.push(new Auction(auction.name, auction.price))
 });
  socket.on('bid', function (message){
  console.log('##############################bid up in dis biach!')
  //socket.broadcast.emit('display_message', message);
});
  socket.on('update_auction', function (auction){
    console.log(';aslkjf;alskdjfl;akjdfl;aksjd;fjk UPDATE');
    console.log()
  })
})
server.listen(8080);
console.log('Server running in localhost port 8000');