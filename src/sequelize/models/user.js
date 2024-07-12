const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const userSchema = require('./schema/user')(DataTypes)

    class User extends Model {
        static associate(models) {
            
        }

        static async getAllUser(data = {}){
          try {
            const users = await User.findAll({raw: true,});
            return users;
          } catch (error) {
            throw error
          }
        }

        static async createUser(data = {}){
          try {
            const userData = await User.create(data)
            return userData
          } catch (error) {
            throw error
          }
        }

        static async findUserData({name, age, salary, phone_number}){
          try {
            const user = await User.findOne({where : {name: name}});
            if(user){
              user.age = age;
              user.salary = salary;
              user.phone_number = phone_number;
              await user.save()
              return user
            }else{
              return user;
            }
          } catch (error) {
            throw error
          }
        }

        static async insertUserData(data = []){
          try {
            const userData = await User.bulkCreate(data)
            return userData
          } catch (error) {
            throw error
          }
        }
    }

    User.init(userSchema, {
      sequelize,
      tableName: 'user',
      modelName: 'User',
      timestamps: false
    });
    return User;
}