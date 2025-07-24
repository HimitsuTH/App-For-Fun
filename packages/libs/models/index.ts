import { Role } from './roles.model'
import { User } from './users.model'

//============ Relational =====================
User.belongsTo(Role, { foreignKey: 'role_id', as: 'roles' })
// Roles.hasMany(Users, { foreignKey: 'role_id', sourceKey: 'id', as: 'users' });

export * from './categories.model'
export * from './expenses.model'
export * from './users.model'
export * from './roles.model'