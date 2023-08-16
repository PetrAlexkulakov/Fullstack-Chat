module.exports = (sequelize, DataTypes) => {
    const Tags = sequelize.define("Tags", {
        tagName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
    return Tags
}