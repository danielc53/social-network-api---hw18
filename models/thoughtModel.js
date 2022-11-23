const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            timestamps: true,
            type: Date,
            default: Date.now,
        }, username: {
            type: String,
        },
        reactions: {
            type: [{
                reactionType: String,
                userId: Schema.Types.ObjectId,
            }]
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        }


    }
);

thoughtSchema.virtual('reactionCount')
    .get(function () {
        return
    });

const thought = model('thought', thoughtSchema);

module.exports = thought;