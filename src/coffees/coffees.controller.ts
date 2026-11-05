import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Res, SetMetadata, UsePipes, ValidationPipe } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';

@UsePipes(ValidationPipe)
@Controller('coffees')
export class CoffeesController {

    constructor(private readonly coffeesService: CoffeesService,
        //  @Inject(REQUEST) private readonly request: Request
        ) { 
        console.log('CoffeesController instantiated');
    }

    @Public()
    @Get()
    async findAll(@Protocol('https') protocol: string, @Query() paginationQuery: PaginationQueryDto) {
        console.log(`Protocol: ${protocol}`);
        // await new Promise(resolve => setTimeout(resolve, 5000));
        return this.coffeesService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string) {
        console.log(id);
        const coffe = this.coffeesService.findOne(id);

        if (!coffe) {
            throw new NotFoundException(`Coffee ${id} not found`);
        }

        return coffe;

    }

    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        this.coffeesService.create(createCoffeeDto);
        return createCoffeeDto;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(id);
    }
}
