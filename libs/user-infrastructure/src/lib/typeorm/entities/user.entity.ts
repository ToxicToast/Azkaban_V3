import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserGroupEntity } from './user_group.entity';

@Entity({ name: 'azkaban_users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  username: string;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  email: string;

  @Column({ unique: false, nullable: false, type: 'varchar' })
  password: string;

  @Column({ unique: false, nullable: true, default: null, type: 'varchar' })
  activation_token: string | null;

  @Column({ unique: false, nullable: true, default: null, type: 'timestamp' })
  activated_at: Date | null;

  @Column({ unique: false, nullable: true, default: null, type: 'timestamp' })
  banned_at: Date | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ nullable: true, default: null, type: 'timestamp' })
  updated_at: Date | null;

  @DeleteDateColumn({ nullable: true, default: null, type: 'timestamp' })
  deleted_at: Date | null;

  @OneToMany(() => UserGroupEntity, (group) => group.user)
  @JoinColumn()
  groups: UserGroupEntity[];
}
