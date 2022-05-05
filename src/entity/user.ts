import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryColumn } from 'typeorm';

@EntityModel('user')
export class User {
  @PrimaryColumn()
  uid: number;

  @Column()
  password: string;
}
