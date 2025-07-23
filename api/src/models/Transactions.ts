import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  CreatedAt,
} from 'sequelize-typescript';

import { Optional } from 'sequelize';

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
  id!: number;

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
  createdAt!: Date;
}
