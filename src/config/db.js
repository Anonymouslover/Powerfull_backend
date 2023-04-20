const mongoose = require('mongoose')
const db = mongoose.connect('mongodb+srv://chandan:Chan%40109@cluster0.xfxzrf0.mongodb.net/cnswebtech?retryWrites=true&w=majority')
.then(() => console.log('Rakesh Welcome And You Are Connected to MongoDB ' + db + " BOOM GUYS!"))
.catch((err) => console.error("Rakesh Go To DATABASE(db.js) File And Find Error" + err));


module.exports = db
