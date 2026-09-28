import { Coffee } from "src/coffees/entities/coffee.entity";
import { Flavor } from "src/coffees/entities/flavor.entity";
import { CoffeRefactor1790311572800 } from "src/migrations/1790311572800-CoffeRefactor";
import { SchemaSync1790312687402 } from "src/migrations/1790312687402-SchemaSync";
import { SchemaSync1790312975431 } from "src/migrations/1790312975431-SchemaSync";
import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'coffee',
    password: 'pass123',
    database: 'coffee_db',
    entities: [Coffee, Flavor],
    migrations: [SchemaSync1790312975431],
})