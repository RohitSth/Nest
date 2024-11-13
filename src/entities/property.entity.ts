import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Property {
  // @PrimaryColumn() // This will make this a primary key
  @PrimaryGeneratedColumn() // This will automatically generate a unique id for each property and is a primary key
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  price: number;
}
