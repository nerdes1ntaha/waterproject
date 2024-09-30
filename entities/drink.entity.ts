import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity()
export class Drink {
  @ObjectIdColumn()
  id: ObjectId = new ObjectId();

  @Column()
  drinkType: string;

  @Column()
  waterRatio: number;

  @Column()
  drinkIcon: string;

  @Column()
  color: string;

  constructor(
    drinkType: string,
    waterRatio: number,
    drinkIcon: string,
    color: string
  ) {
    this.drinkType = drinkType;
    this.waterRatio = waterRatio;
    this.drinkIcon = drinkIcon;
    this.color = color;
  }
}
