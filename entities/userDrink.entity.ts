import { Entity, ObjectIdColumn, ObjectId, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class userDrink {
    @ObjectIdColumn()
    id: ObjectId = new ObjectId();

    @ManyToOne(() => User)
    user: User;

    @Column()
    amount: number;

    @Column()
    dateTime: Date;

    constructor(
        user: User,
        amount: number,
        dateTime: Date,
    ) {
        this.user = user,
        this.amount = amount,
        this.dateTime = dateTime
    }

}