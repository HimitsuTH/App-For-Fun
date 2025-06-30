import sequelize from 'libs/helpers/sequelize.helper'
import { DataTypes, Model } from 'sequelize'

export class Categories extends Model {
  id!: number
  name!:string
  description!: string
  created_at!: Date
}

Categories.init(
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
    },
    created_at: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    tableName: 'categories',
    timestamps: false,
  },
)
