import sequelize from 'libs/helpers/sequelize.helper'
import { DataTypes, Model } from 'sequelize'

export class Roles extends Model {
  id!: number
  name!:string
  created_at!: Date
}

Roles.init(
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    tableName: 'roles',
    timestamps: false,
  },
)
