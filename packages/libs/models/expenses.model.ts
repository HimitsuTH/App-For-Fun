import sequelize from 'libs/helpers/sequelize.helper'
import { DataTypes, Model } from 'sequelize'

export class Expenses extends Model {
  declare id: number
  declare user_id: number
  declare category_id: string
  declare name:string
  declare amount: string
  declare description: string
  declare date: Date
  declare created_at: Date
}

Expenses.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('INCOME','EXPENSE'),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
    },
    created_at: {
      type: DataTypes.DATE,
    }
  },
  {
    sequelize,
    tableName: 'expenses',
    timestamps: false,
  },
)
