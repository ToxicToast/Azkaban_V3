import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'foodfolio_shoppinglist' })
export class ShoppingListEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, nullable: false, type: 'varchar' })
	item_id: string;

	@Column({ unique: true, nullable: false, type: 'varchar' })
	variant_id: string;

	@Column({ unique: false, nullable: false, default: 0, type: 'int' })
	current_sku: number;

	@Column({ unique: false, nullable: false, default: 0, type: 'int' })
	min_sku: number;

	@Column({ unique: false, nullable: false, default: 0, type: 'int' })
	max_sku: number;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ nullable: true, default: null, type: 'timestamp' })
	updated_at: Date | null;

	@DeleteDateColumn({ nullable: true, default: null, type: 'timestamp' })
	deleted_at: Date | null;
}
