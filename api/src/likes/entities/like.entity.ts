import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    Entity,
    Column,
  } from 'typeorm';
 
@Entity('likes')
export class Like {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({type:'varchar', unique: true})
    cat_id: string;
  
    @CreateDateColumn()
    created_at: Date;
}
