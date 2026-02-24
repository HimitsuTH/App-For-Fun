// models/wallet.model.ts
import { Model, DataTypes } from 'sequelize'
import sequelize from 'libs/helpers/sequelize.helper'

export class Wallet extends Model {
  declare balance: number
  declare currency: string
}

Wallet.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
        model: 'users',
        key: 'id',
    },
  },
  balance: {
    type: DataTypes.DECIMAL(18, 2),
    defaultValue: 0.00,
  },
  currency: {
    type: DataTypes.STRING(10),
    defaultValue: 'THB',
  },
}, {
  sequelize,
  tableName: 'wallets',
  timestamps: true,
  createdAt: false,
  updatedAt: 'updated_at',
})

