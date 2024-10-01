import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import { userDrink } from "../entities/userDrink.entity";
import { Drink } from "../entities/drink.entity";


export const AppDataSource = new DataSource({
  type: "mongodb",
  database: "your_database_name",
  synchronize: true,
  logging: true,
  entities: [User, userDrink, Drink], 
  useUnifiedTopology: true,
});
