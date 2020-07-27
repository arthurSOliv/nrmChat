const request = require("request");
const io = require("socket.io-client");

const app = require('./app');

const server = app.listen(3334, ()=>{
    console.log("Server started on port 3334");
  });

const socket = io("http://localhost:3333");

socket.on("disconnect", () => {
    console.log('Bot Disconnected');
});

socket.on("connected", (socket) => {
    console.log('Bot Connected' + socket);
})

socket.emit("bot add");
socket.on("stock", (stock) => {
    request.get(`https://stooq.com/q/l/?s=${stock}&f=sd2t2ohlcv&h&e=csv`, {}, (error, response) => {
        const [headersLine, ...dataLines] = response.body.split("\r\n");
        const properties = headersLine.split(",");
        const stocks = dataLines.map((aStockString) => {
            if (aStockString != "") {
                const splittedStockString = aStockString.split(",");
                return properties.reduce(
                    (aStock, aProperty, anIndex) => {
                        aStock[aProperty] = splittedStockString[anIndex];
                        return aStock;
                    },
                    {}
                );
            }
        }, []);
        if (Number(stocks[0].Close))
            socket.send(`${stocks[0].Symbol} quote is ${stocks[0].Close} per share`);
        else
            socket.send(`${stock.toUpperCase()} quote could not be processed or was not found`);
    });
});