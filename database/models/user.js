module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipcode: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.belongsToMany(models.Device, {
      through: 'user_devices',
      foreignKey: 'user_id',
    });
  };

  return User;
};
