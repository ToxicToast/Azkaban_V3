import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'characters' })
export class CharacterEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: false, nullable: true, type: 'varchar' })
	user_id: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	region: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	realm: string;

	@Column({ unique: false, nullable: false, type: 'varchar' })
	name: string;
}
