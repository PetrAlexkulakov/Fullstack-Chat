module.exports = (sequelize, DataTypes) => {
    const MessageTag  = sequelize.define("MessageTag", {
        messageId: {
            type: DataTypes.INTEGER,
            references: {
              model: 'Messages',
              key: 'id',
            },
          },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Tags', 
                key: 'id',
            },
        },
    })
    return MessageTag 
}