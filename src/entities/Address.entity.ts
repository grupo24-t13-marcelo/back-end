import User from "./User.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 9, nullable: false })
  zip_code: string;

  @Column({ length: 2, nullable: false })
  state: string;

  @Column({ length: 26, nullable: false })
  city: string;

  @Column({ length: 26, nullable: false })
  street: string;

  @Column({ length: 11, nullable: false })
  number: string;

  @Column({ length: 26, nullable: true })
  complement: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  @JoinColumn()
  ownerid: User;
}

export default Address;
