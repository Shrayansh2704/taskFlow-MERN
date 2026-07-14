const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        owner : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        },

        title : {
            type : String,
            required : true,
            trim : true,
        },

        priority : {
            type : String,
            enum : ["Low", "Medium", "High"],
            default : "Low",
        },

        isCompleted : {
            type : Boolean,
            default : false,
        },

        startDate : {
            type : Date,
            required : true,
        },

        endDate : {
            type : Date,
            required : true,
        },

        startTime : {
            type : String,
            required : true,
        },

        endTime : {
            type : String,
            requried : true,
        },
    },
    {
        timestamps : true,
    }
);

module.exports = mongoose.model("Todo", todoSchema);