import { Entity, PrimaryColumn } from 'typeorm';

@Entity('friends')
export class Friend {
  @PrimaryColumn({ name: 'user1_id', type: 'bigint' })
  user1Id: number;

  @PrimaryColumn({ name: 'user2_id', type: 'bigint' })
  user2Id: number;

  constructor(user1Id: number, user2Id: number) {
    this.user1Id = user1Id;
    this.user2Id = user2Id;
  }
}
