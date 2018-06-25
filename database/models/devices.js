module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('device', {
    name: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    connectInfo: {
      type: DataTypes.STRING,
    },
  });

  Device.associate = (models) => {
    Device.belongsToMany(models.User, {
      through: 'user_devices',
      foreignKey: 'device_id',
    });
    Device.belongsToMany(models.Profile, {
      through: 'profile_devices',
      foreignKey: 'device_id',
    });
  };

  return Device;
};

