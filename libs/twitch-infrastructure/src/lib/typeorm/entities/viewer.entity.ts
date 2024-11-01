import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Nullable } from '@toxictoast/azkaban-base-types';

@Entity({ name: 'viewers' })
export class ViewerEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	user_id: string;

	@Column({ unique: true, nullable: false, type: 'varchar' })
	display_name: string;

	@Column({ type: 'int', default: 0 })
	joins: number;

	@Column({ type: 'int', default: 0 })
	parts: number;

	@Column({ type: 'int', default: 0 })
	messages: number;

	@Column({ type: 'int', default: 0 })
	timeouts: number;

	@Column({ type: 'int', default: 0 })
	bans: number;

	@Column({ type: 'int', default: 0 })
	minutes_watched: number;

	@Column({ nullable: true, type: 'timestamp', default: null })
	lastseen_at: Nullable<Date>;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ nullable: true, default: null, type: 'timestamp' })
	updated_at: Date | null;

	@DeleteDateColumn({ nullable: true, default: null, type: 'timestamp' })
	deleted_at: Date | null;
}
