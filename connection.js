const mongoose = require("mongoose");

async function connectToMMongoDB(url) {
    return  mongoose.connect(url);

    
}



module.exports = {
    connectToMMongoDB,
   
};