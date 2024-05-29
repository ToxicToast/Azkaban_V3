import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'azkaban_user_groups' })
export class UserGroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  group_id: string;

  /*@Column({ unique: true, nullable: false, type: 'varchar' })
  user_id: string;*/

  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  // TODO: One to One relation with GroupsEntity
}
