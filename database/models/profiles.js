module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('profile', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
    }
  });

  Profile.associate = (models) => {
    Profile.belongsToMany(models.Widget, {
      through: 'profile_widgets',
      foreignKey: 'profile_id',
    });
    Profile.belongsToMany(models.Device, {
      through: 'profile_devices',
      foreignKey: 'profile_id',
    });
  };

  return Profile;
};

