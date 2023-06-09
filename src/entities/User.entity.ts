import Vehicle from "./Vehicles.entity";
import Address from "./Address.entity";
import Comment from "./Comments.entity";
import { Exclude } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  OneToOne,
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
  @Exclude()
  password: string;

  @Column({ type: "text", nullable: true, unique: true })
  userToken: string | null;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[];

  @OneToMany(() => Comment, (comment) => comment.ownerid)
  comments: Comment[];

  @OneToOne(() => Address, (address) => address.ownerid)
  address: Address;

  @BeforeInsert()
  hashPassword() {
    const hash = hashSync(this.password, 10);
    this.password = hash;
  }
}

export default User;
