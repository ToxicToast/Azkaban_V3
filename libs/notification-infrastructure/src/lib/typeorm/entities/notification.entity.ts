import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'azkaban_notification' })
export class NotificationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: false, nullable: false, type: 'varchar' })
    service: string;

    @Column({ unique: false, nullable: false, type: 'varchar' })
    event: string;

    @Column({ unique: false, nullable: false, type: 'json' })
    payload: unknown;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ nullable: true, default: null, type: 'timestamp' })
    updated_at: Date | null;

    @DeleteDateColumn({ nullable: true, default: null, type: 'timestamp' })
    deleted_at: Date | null;
}
