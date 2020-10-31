const { Schema, model } = require("mongoose")


const notificationSchema = new Schema({
    body: {
        type: String,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true })


module.exports = model("Notification",notificationSchema)