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
    return MessageTag 
} //#1064 - You have an error in SQL SyntaxError; check the manual that corresponds to your MySQL server version for the tight syntax to use '' at line 1