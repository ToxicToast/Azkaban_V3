import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'azkaban_user_groups' })
export class AuthGroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  group_id: string;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  user_id: string;
}
