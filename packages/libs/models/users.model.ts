import sequelize from 'libs/helpers/sequelize.helper'
import { DataTypes, Model } from 'sequelize'

export class User extends Model {
  declare id: number; 
  declare uuid: string; 
  declare username:string
  declare password: string
  declare email: string
  declare role_id: number
  declare status: "active" | "inactive"
  declare invalid_password_time: number
  declare created_at: Date
  declare updated_at: Date
}

User.init(
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
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updated_at',
  },
)
