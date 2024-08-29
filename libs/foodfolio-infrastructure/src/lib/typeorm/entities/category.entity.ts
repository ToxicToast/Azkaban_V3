import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	parent_id: string | null;

	@Column({ unique: true, nullable: false, type: 'varchar' })
	title: string;

	@Column({ unique: false, nullable: true, default: null, type: 'timestamp' })
	activated_at: Date | null;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ nullable: true, default: null, type: 'timestamp' })
	updated_at: Date | null;

	@DeleteDateColumn({ nullable: true, default: null, type: 'timestamp' })
	deleted_at: Date | null;
}
