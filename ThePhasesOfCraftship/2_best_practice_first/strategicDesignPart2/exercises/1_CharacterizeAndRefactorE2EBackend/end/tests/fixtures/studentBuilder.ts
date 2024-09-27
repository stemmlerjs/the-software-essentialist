import { prisma } from "../../src/database";
import { faker } from "@faker-js/faker";
import { Student } from "@prisma/client";

class StudentBuilder {
  private student: Partial<Student>;

  constructor() {
    this.student = {
      name: faker.person.fullName(),
      email: faker.internet.email()
    };
  }

  withRandomDetails () {
    this.student.email = faker.internet.email();
    this.student.name = faker.person.fullName();
    return this;
  }

  withName(name: string) {
    this.student.name = name;
    return this;
  }

  withEmail (email: string) {
    this.student.email = email;
    return this;
  }

  async build() {    

    let student = await prisma.student.upsert({
      where: {
        email: this.student.email as string,
      },
      create: {
        name: this.student.name as string,
        email: this.student.email as string
      },
      update: {
        name: this.student.name as string,
        email: this.student.email as string
      }
    });

    return student as Student;
  }

}

export { StudentBuilder };