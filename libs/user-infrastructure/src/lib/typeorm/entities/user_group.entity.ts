import {
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { GroupEntity } from '@azkaban/group-infrastructure';

@Entity({ name: 'user_groups' })
export class UserGroupEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => UserEntity, (user) => user.id)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;

	@ManyToOne(() => GroupEntity, (group) => group.id)
	@JoinColumn({ name: 'group_id' })
	group: GroupEntity;
}
