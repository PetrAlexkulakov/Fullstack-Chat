module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define("Messages", {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
    return Messages
}