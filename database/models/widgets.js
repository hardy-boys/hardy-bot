module.exports = (sequelize, DataTypes) => {
  const Widget = sequelize.define('widget', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    widgetInfo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Widget.associate = (models) => {
    Widget.belongsToMany(models.Profile, {
      through: 'profile_widgets',
      foreignKey: 'widget_id',
    });
    Widget.belongsToMany(models.User, {
      through: models.UserWidgetConfig,
    });
  };

  return Widget;
};

