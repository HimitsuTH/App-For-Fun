// models/wallet.model.ts
import { Model, DataTypes } from 'sequelize'
import sequelize from 'libs/helpers/sequelize.helper'
import { User } from './users.model'

class Wallet extends Model {}

Wallet.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
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

Wallet.belongsTo(User, { foreignKey: 'user_id' })
User.hasOne(Wallet, { foreignKey: 'user_id' })

export default Wallet
