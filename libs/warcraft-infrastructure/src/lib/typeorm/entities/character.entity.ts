import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'characters' })
export class CharacterEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;
}
