import sequelize from 'libs/helpers/sequelize.helper'
import { DataTypes, Model } from 'sequelize'

export class Expenses extends Model {
  id!: number
  user_id!: number
  category_id!: string
  name!:string
  amount!: string
  expense!: string
  description!: string
  date!: Date
  created_at!: Date
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
        model: 'category',
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
