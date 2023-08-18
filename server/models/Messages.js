module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define("Messages", {
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
    Messages.associate = (models) => {
        Messages.belongsToMany(models.Tags, { through: models.MessageTag, foreignKey: 'messageId' });
    };

    return Messages;
}