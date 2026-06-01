import { Injectable, NotFoundException } from '@nestjs/common';
import { Person } from './interfaces/person.interface';
import { PERSONS_SEED } from './seed/persons.seed';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonsService {
  private persons: Person[] = [...PERSONS_SEED];
  private nextId = PERSONS_SEED.length + 1;

  findAll(): Person[] {
    return this.persons;
  }

  findOne(id: number): Person {
    const person = this.persons.find((p) => p.id === id);
    if (!person) throw new NotFoundException(`Person with id ${id} not found`);
    return person;
  }

  create(dto: CreatePersonDto): Person {
    const person: Person = {
      id: this.nextId++,
      active: true,
      ...dto,
    };
    this.persons.push(person);
    return person;
  }

  update(id: number, dto: UpdatePersonDto): Person {
    const index = this.persons.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Person with id ${id} not found`);
    this.persons[index] = { ...this.persons[index], ...dto };
    return this.persons[index];
  }

  remove(id: number): void {
    const index = this.persons.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Person with id ${id} not found`);
    this.persons.splice(index, 1);
  }

  reset(): void {
    this.persons = [...PERSONS_SEED];
    this.nextId = PERSONS_SEED.length + 1;
  }
}
