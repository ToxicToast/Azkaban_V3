import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'item' })
export class ItemEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, nullable: false, type: 'varchar' })
	title: string;

	@Column({ unique: false, nullable: false, default: 0, type: 'int' })
	current_sku: number;

	@Column({ unique: false, nullable: false, default: 0, type: 'int' })
	min_sku: number;

	@Column({ unique: false, nullable: false, default: 0, type: 'int' })
	max_sku: number;

	@Column({ unique: false, nullable: true, default: null, type: 'timestamp' })
	activated_at: Date | null;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ nullable: true, default: null, type: 'timestamp' })
	updated_at: Date | null;

	@DeleteDateColumn({ nullable: true, default: null, type: 'timestamp' })
	deleted_at: Date | null;
}
