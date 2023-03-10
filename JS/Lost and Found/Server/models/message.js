const { Sequelize } = require(".")

module.exports = (sequelize, DataTypes) => {

        const message = sequelize.define("message", 
        {

            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },

            Message: {
                type: DataTypes.STRING
            },

            Sender: {
                type: DataTypes.STRING
            },

            Receiver: {
                type: DataTypes.STRING
            },
        })

        return message
}