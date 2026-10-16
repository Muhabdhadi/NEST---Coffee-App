import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { ConfigModule } from '@nestjs/config';
import coffeeConfig from './config/coffee.config';
@Injectable()
export class CoffeBrandsFactory {
    create() {
        /** .. do some work */
        return ['buddy brew', 'nescafe'];
    }
}
@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule.forFeature(coffeeConfig)],
    controllers: [CoffeesController],
    providers: [
        CoffeesService, 
        CoffeBrandsFactory,
        // { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe']},
        { provide: COFFEE_BRANDS, useFactory: async () => {
            // const coffeeBrands = await connection.query('SELECT * ...')
            const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
            console.log('[!] Async factory');
            return coffeeBrands;
        }, inject: [CoffeBrandsFactory] },

        // { provide: COFFEE_BRANDS, useFactory: (brandsFactory: CoffeBrandsFactory) => brandsFactory.create(), inject: [CoffeBrandsFactory]},
    ],
    exports: [CoffeesService]
})
export class CoffeesModule {}
