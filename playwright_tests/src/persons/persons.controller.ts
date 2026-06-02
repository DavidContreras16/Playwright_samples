import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get()
  findAll(@Res() res: Response) {
    const persons = this.personsService.findAll();
    return res.status(HttpStatus.OK).json(persons);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const person = this.personsService.findOne(id);
    if (!person) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: `Person ${id} not found` });
    }
    return res.status(HttpStatus.OK).json(person);
  }

  @Post()
  create(@Body() dto: CreatePersonDto, @Res() res: Response) {
    const person = this.personsService.create(dto);
    return res.status(HttpStatus.CREATED).json(person);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePersonDto,
    @Res() res: Response,
  ) {
    const person = this.personsService.update(id, dto);
    if (!person) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: `Person ${id} not found` });
    }
    return res.status(HttpStatus.OK).json(person);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const deleted = this.personsService.remove(id);
    if (!deleted) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: `Person ${id} not found` });
    }
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Post('reset')
  reset(@Res() res: Response) {
    this.personsService.reset();
    return res.status(HttpStatus.OK).json({ message: 'Data reset to seed' });
  }
}
