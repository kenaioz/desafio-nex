import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  CreatedAt,
  BelongsTo,
} from 'sequelize-typescript';

import { Optional } from 'sequelize';
import { User } from './Users';

export type TransactionStatus = 'Aprovado' | 'Reprovado' | 'Em avaliação';

export interface TransactionAttributes {
  id: number;
  cpf: string;
  description: string;
  date: Date;
  points: number;
  value: number;
  status: TransactionStatus;
  createdAt?: Date;
}

export interface TransactionCreationAttributes
  extends Optional<TransactionAttributes, 'id' | 'createdAt'> {}

@Table({ tableName: 'transactions' })
export class Transaction extends Model<
  TransactionAttributes,
  TransactionCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @Column({ type: DataType.STRING(14), allowNull: false })
  cpf!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    field: 'date',
  })
  date!: Date;

  @Column({ type: DataType.INTEGER, allowNull: false, field: 'points' })
  points!: number;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
    field: 'value',
  })
  value!: number;

  @Column({
    type: DataType.ENUM('Aprovado', 'Reprovado', 'Em avaliação'),
    allowNull: false,
  })
  status!: TransactionStatus;

  @CreatedAt
  @Column({ type: DataType.DATE })
  declare createdAt: Date;

  // Relacionamento: Uma transação pertence a um usuário
  @BelongsTo(() => User, { foreignKey: 'cpf', targetKey: 'cpf' })
  user!: User;
}
