module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define("Messages", {
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
    return Messages
}