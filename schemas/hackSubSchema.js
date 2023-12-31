const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };
const nonReqString = { type: String, required: false };

const hackSubSchema = new Schema(
    {
        teamName: reqString,
        submissionLink: reqString,
        gdLink: reqString,
        dateCreated: {
            type: Date,
            required: true,
            default: Date.now
        },
        thumbnail: reqString,
        prize: {
            type: Number,
            required: true,
            default: 0
        },
        env: reqString,
        projectName: reqString,
        desc:  reqString
    }
);


module.exports = mongoose.model("hacks", hackSubSchema);
