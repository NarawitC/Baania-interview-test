module.exports = (sequelize, DataTypes) => {
  const House = sequelize.define(
    'House',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      postCode: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
    },
    { underscored: true, paranoid: true }
  );
  return House;
};
