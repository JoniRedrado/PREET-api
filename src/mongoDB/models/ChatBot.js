const { Schema, model } = require('mongoose');

const ChatBot = model(
    "ChatBot",
    new Schema({
        userId:{
            type: String,
            required: true,
            unique: true
        },
        hotelId:{
            type: Number,
            validate:{
                validator: (value) => Number.isInteger(value) && value > 0,
                message: "El id debe ser un numero entero mayor a uno"
            }
        },
        messages:{
            type:[{
                rol:{
                    type: String,
                    enum:['user', 'bot'],
                    required: true
                },
                message:{
                    type: String,
                    required: true,
                    validate:{
                        validator: (value) => value.length > 0,
                        message: "El mensaje no puede ser una cadena vacia"
                    }
                },
                date:{
                    type: Date,
                    default: Date.now
                }
            }],
            default: []
        },
        finish:{
            type: Boolean,
            default: false
        }
    }, {timestamps: true})
);

module.exports = ChatBot;