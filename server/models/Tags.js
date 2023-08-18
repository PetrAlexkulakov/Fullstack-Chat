module.exports = (sequelize, DataTypes) => {
    const Tags = sequelize.define("Tags", {
        tagName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
    Tags.associate = (models) => {
        Tags.belongsToMany(models.Messages, { through: models.MessageTag, foreignKey: 'tagId' });
    };

    return Tags;
}