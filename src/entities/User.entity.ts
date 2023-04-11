import Vehicle from "./Vehicles.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { hashSync } from "bcrypt";

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

  @Column({ length: 11, nullable: false, unique: true })
  number: string;

  @Column({ length: 14, nullable: false })
  dateBirth: string;

  @Column({ nullable: false })
  description: string;

  @Column({ default: true })
  isAdvertiser: boolean;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  contacts: Vehicle[];

  @BeforeInsert()
  hashPassword() {
    const hash = hashSync(this.password, 10);
    this.password = hash;
  }
}

export default User;
