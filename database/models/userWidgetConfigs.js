module.exports = (sequelize, DataTypes) => {
  const UserWidgetConfig = sequelize.define('user_widget_config', {
    configuration: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
    },
  });

  UserWidgetConfig.associate = (models) => {
    UserWidgetConfig.belongsTo(models.User, {
      through: models.UserWidgetConfig,
    });
    UserWidgetConfig.belongsTo(models.Widget, {
      through: models.UserWidgetConfig,
    });
  };

  return UserWidgetConfig;
};
