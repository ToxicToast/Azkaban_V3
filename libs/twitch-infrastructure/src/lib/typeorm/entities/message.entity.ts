import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'messages' })
export class MessageEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, nullable: false, type: 'varchar' })
	message_id: string;

	@Column({ unique: true, nullable: false, type: 'varchar' })
	display_name: string;

	@Column({ type: 'text' })
	message: string;

	@Column({ type: 'string', default: '#000000' })
	color: string;

	@Column({ type: 'boolean', default: true })
	first: boolean;

	@Column({ type: 'boolean', default: false })
	reply: boolean;

	@Column({ type: 'boolean', default: false })
	redemption: boolean;

	@Column({ type: 'boolean', default: false })
	cheer: boolean;

	@Column({ type: 'boolean', default: false })
	highlight: boolean;

	@Column({ type: 'boolean', default: false })
	returning_chatter: boolean;

	@Column({ type: 'boolean', default: false })
	broadcaster: boolean;

	@Column({ type: 'boolean', default: false })
	vip: boolean;

	@Column({ type: 'boolean', default: false })
	mod: boolean;

	@Column({ type: 'boolean', default: false })
	subscriber: boolean;

	@Column({ type: 'boolean', default: false })
	artist: boolean;

	@Column({ type: 'boolean', default: false })
	founder: boolean;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ nullable: true, default: null, type: 'timestamp' })
	updated_at: Date | null;

	@DeleteDateColumn({ nullable: true, default: null, type: 'timestamp' })
	deleted_at: Date | null;
}
