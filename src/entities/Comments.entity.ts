import Vehicle from "./Vehicles.entity";
import User from "./User.entity";
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("comments")
class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  commenttext: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.id)
  @JoinColumn()
  vehicleid: Vehicle;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  ownerid: User;
}

export default Comment;
