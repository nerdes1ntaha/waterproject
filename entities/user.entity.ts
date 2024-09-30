import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId = new ObjectId();

  @Column()
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  gender: string;

  @Column()
  weight: number;

  @Column()
  height: string;

  @Column()
  target: number;

  @Column()
  premiumAccount: boolean;

  //   @Column()
  //   reminder: string;

  @Column()
  age: number;

  constructor(
    userName: string,
    email: string,
    password: string,
    gender: string,
    weight: number,
    height: string,
    target: number,
    premiumAccount: boolean,
    age: number
  ) {
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.weight = weight;
    this.height = height;
    this.target = target;
    this.premiumAccount = premiumAccount;
    this.age = age;
  }
}
