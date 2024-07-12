module.exports = DataTypes => ({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    salary: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })