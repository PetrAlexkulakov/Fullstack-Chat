module.exports = (sequelize, DataTypes) => {
    const MessageTag  = sequelize.define("MessageTag", {
        messageId: {
            type: DataTypes.INTEGER,
            references: {
              model: 'Messages',
              key: 'id',
            },
          },
        tagId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Tags', 
                key: 'id',
            },
        },
    })
    MessageTag.associate = (models) => {
        MessageTag.belongsTo(models.Messages, { foreignKey: 'messageId' });
        MessageTag.belongsTo(models.Tags, { foreignKey: 'tagId' });
    };

    return MessageTag;
} 