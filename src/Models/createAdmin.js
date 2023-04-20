const mongoose = require("mongoose");
const { Schema } = mongoose;
// const permissionSchema = require("./Permission");
const { hashPassword, addVerifyPassword } = require('./../Helper/hashPassword');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: {type: String, required: true  },
  password: { type: String, required: true, minlength: 3, maxlength: 1024 },
  phone :{ type: String, required: false },
  role: { type: String, default:"admin"  },
  salt: { type: String },
  jwtToken : { type: String,required: false },
  //SuperAdminId:{ type:mongoose.Schema.Types.ObjectId, ref:"superadmin",required:true },

},

{
    timestamps:true,
    versionKey:false
});


UserSchema.pre('save', hashPassword);

addVerifyPassword(UserSchema);

const CreateAdminModel = mongoose.model("user", UserSchema);

module.exports = CreateAdminModel;