import sequelize from 'libs/helpers/sequelize.helper'
import { DataTypes, Model } from 'sequelize'

export class Categories extends Model {
  declare id: number
  declare name: string
  declare description: string
  declare budget_limit: number | null  // ✅ budget limit ต่อเดือน
  declare created_at: Date
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
    budget_limit: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
      defaultValue: null,
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
