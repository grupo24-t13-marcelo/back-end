import { Exclude } from "class-transformer";
import Vehicle from "./Vehicles.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 26, nullable: false })
  name: string;

  @Column({ length: 72, nullable: false, unique: true })
  email: string;

  @Column({ length: 24, nullable: false, unique: true })
  cpf: string;

  @Column()
  number: number;

  @Column({ length: 14, nullable: false })
  dateBirth: string;

  @Column({ nullable: false })
  description: string;

  @Column({ default: true })
  isAdvertiser: boolean;

  @Column({ select: false })
  @Exclude()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  contacts: Vehicle[];
}

export default User;
