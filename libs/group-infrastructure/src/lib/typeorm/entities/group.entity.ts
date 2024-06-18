import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'azkaban_groups' })
export class GroupEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: false, type: 'varchar' })
    title: string;

    @Column({ unique: true, nullable: false, type: 'varchar' })
    slug: string;

    @Column({ unique: false, nullable: false, type: 'boolean' })
    active: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ nullable: true, default: null, type: 'timestamp' })
    updated_at: Date | null;

    @DeleteDateColumn({ nullable: true, default: null, type: 'timestamp' })
    deleted_at: Date | null;
}
