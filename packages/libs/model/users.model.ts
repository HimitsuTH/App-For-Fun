import sequelize from 'libs/helpers/sequelize.helper'
import { DataTypes, Model } from 'sequelize'

export class Users extends Model {
  id!: number
  username!:string
  password!: string
  email!: string
  date!: Date
  invalid_password_time!: number
  created_at!: Date
}

Users.init(
  {
    username: {
      type: DataTypes.STRING(50),
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING(255)
    },
    invalid_password_time: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
  },
)
