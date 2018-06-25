module.exports = (sequelize, DataTypes) => {
  const Widget = sequelize.define('widget', {
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    widgetInfo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Widget.associate = (models) => {
    Widget.belongsToMany(models.Profile, {
      through: 'profile_widgets',
      foreignKey: 'widget_id',
    });
  };

  return Widget;
};

