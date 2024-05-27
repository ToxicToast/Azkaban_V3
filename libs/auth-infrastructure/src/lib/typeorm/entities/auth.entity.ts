import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'azkaban_users', synchronize: false })
export class AuthEntity {
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
}
