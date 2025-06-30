import sequelize from 'libs/helpers/sequelize.helper'
import { DataTypes, Model } from 'sequelize'

export class Users extends Model {
  id!: number
  username!:string
  password!: string
  email!: string
  role_id!: number
  status!: "active" | "inactive"
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
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'roles',
        key: 'id',
      },
    },
    invalid_password_time: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
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
