import { Exclude } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import User from "./User.entity";

@Entity("vehicles")
class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 46, nullable: false })
  title: string;

  @Column({ length: 26, nullable: false })
  brand: string;

  @Column({ length: 26, nullable: false })
  model: string;

  @Column({ nullable: false })
  year: number;

  @Column({ length: 16, nullable: false })
  fuel: string;

  @Column({ nullable: false })
  mileage: number;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  coverUrl: string;

  @Column({ default: true })
  bellowFipe: boolean;

  @Column({ nullable: false })
  fipe: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;
}

export default Vehicle;
