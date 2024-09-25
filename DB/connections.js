const mongoose = require('mongoose');
const connectionString = process.env.DATABASE;
mongoose.connect(connectionString).then((res) => {
    console.log("Mongo Db connected Successfully")
})
    .catch((err) => {
        console.log("MongoDB Connection Failed")
        console.log(err)
})