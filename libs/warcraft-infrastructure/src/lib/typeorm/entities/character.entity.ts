import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'characters' })
export class CharacterEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	user_id: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	region: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	realm: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	name: string;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	gender: string;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	faction: string;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	race: string;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	character_class: string;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	active_spec: string;

	@Column({ unique: false, nullable: false, type: 'int', default: 1 })
	level: number;

	@Column({ unique: false, nullable: false, type: 'float', default: 0 })
	item_level: number;

	@Column({ unique: false, nullable: true, type: 'varchar', default: null })
	guild: string | null;

	@Column({ unique: false, nullable: true, default: null, type: 'timestamp' })
	activated_at: Date | null;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ nullable: true, default: null, type: 'timestamp' })
	updated_at: Date | null;

	@DeleteDateColumn({ nullable: true, default: null, type: 'timestamp' })
	deleted_at: Date | null;
}
