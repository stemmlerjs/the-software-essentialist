
import { prisma } from "../../src/database";
import { ClassroomBuilder } from "./classRoomBuilder";
import { StudentBuilder } from "./studentBuilder";

export class EnrolledStudentBuilder {
  private classRoomBuilder?: ClassroomBuilder;
  private studentBuilder?: StudentBuilder;

  from (classRoomBuilder: ClassroomBuilder) {
    this.classRoomBuilder = classRoomBuilder;
    return this;
  }

  and (studentBuilder: StudentBuilder) {
    this.studentBuilder = studentBuilder;
    return this;
  }

  async build() {
    if (!this.studentBuilder) throw new Error('You must define the student builder');
    if (!this.classRoomBuilder) throw new Error('You must define the classroom builder');

    let classRoom = await this.classRoomBuilder.build();
    let student = await this.studentBuilder.build();
    
    const enrolledStudent = await prisma.classEnrollment.upsert({
      where: {
        studentId_classId: {
          studentId: student.id,
          classId: classRoom.id
        }
      },
      create: {
        studentId: student.id,
        classId: classRoom.id
      },
      update: {
        studentId: student.id,
        classId: classRoom.id
      }
    });

    return { student, classRoom, enrolledStudent }
  }
}