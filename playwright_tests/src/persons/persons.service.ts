import { Injectable } from '@nestjs/common';
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

  findOne(id: number): Person | null {
    return this.persons.find((p) => p.id === id) ?? null;
  }

  create(dto: CreatePersonDto): Person {
    const person: Person = { id: this.nextId++, active: true, ...dto };
    this.persons.push(person);
    return person;
  }

  update(id: number, dto: UpdatePersonDto): Person | null {
    const index = this.persons.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.persons[index] = { ...this.persons[index], ...dto };
    return this.persons[index];
  }

  remove(id: number): boolean {
    const index = this.persons.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.persons.splice(index, 1);
    return true;
  }

  reset(): void {
    this.persons = [...PERSONS_SEED];
    this.nextId = PERSONS_SEED.length + 1;
  }
}
