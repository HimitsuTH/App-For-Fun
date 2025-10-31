import { Role } from './roles.model'
import { User } from './users.model'
import { Categories } from './categories.model';
import { Expenses } from './expenses.model';
import { Wallet } from './wallet.model';

//============ Relational =====================
User.belongsTo(Role, { foreignKey: 'role_id', as: 'roles' })
Expenses.belongsTo(Categories, { foreignKey: 'category_id', as: 'categories'});
User.hasOne(Wallet, { foreignKey: 'user_id', as: 'wallet' });
Wallet.belongsTo(User, { foreignKey: 'user_id', as: 'users' });
// Roles.hasMany(Users, { foreignKey: 'role_id', sourceKey: 'id', as: 'users' });

export * from './categories.model'
export * from './expenses.model'
export * from './users.model'
export * from './roles.model'
export * from './wallet.model'