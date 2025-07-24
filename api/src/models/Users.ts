import { Optional } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  Default,
  HasMany,
} from 'sequelize-typescript';
import { Transaction } from './Transactions';

export interface UserAttributes {
  id: number;
  password: string;
  cpf: string;
  email: string;
  fullName: string;
  admin: boolean;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User, UserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(14))
  cpf!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  fullName!: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  admin!: boolean;

  @HasMany(() => Transaction, { foreignKey: 'cpf', sourceKey: 'cpf' })
  transactions!: Transaction[];
}
