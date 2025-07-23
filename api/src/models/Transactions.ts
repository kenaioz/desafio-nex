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
  descricao: string;
  dataTransacao: Date;
  valorPontos: number;
  valor: number;
  status: TransactionStatus;
  createdAt?: Date;
}

export type TransactionCreationAttributes = Optional<
  TransactionAttributes,
  'id' | 'createdAt'
>;

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
  descricao!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    field: 'data_transacao',
  })
  dataTransacao!: Date;

  @Column({ type: DataType.INTEGER, allowNull: false, field: 'valor_pontos' })
  valorPontos!: number;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
    field: 'valor_monetario',
  })
  valor!: number;

  @Column({
    type: DataType.ENUM('Aprovado', 'Reprovado', 'Em avaliação'),
    allowNull: false,
  })
  status!: TransactionStatus;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt!: Date;
}
