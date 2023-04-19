import Vehicle from "./Vehicles.entity";
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("Photos")
class Photo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  photourl: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.id)
  @JoinColumn()
  vehicle: Vehicle;
}

export default Photo;
