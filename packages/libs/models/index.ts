import { Roles } from './roles.model'
import { Users } from './users.model'

//============ Relational =====================
Users.belongsTo(Roles, { foreignKey: 'role_id', as: 'roles' })
// Roles.hasMany(Users, { foreignKey: 'role_id', sourceKey: 'id', as: 'users' });

export * from './category.model'
export * from './expenses.model'
export * from './users.model'
export * from './roles.model'