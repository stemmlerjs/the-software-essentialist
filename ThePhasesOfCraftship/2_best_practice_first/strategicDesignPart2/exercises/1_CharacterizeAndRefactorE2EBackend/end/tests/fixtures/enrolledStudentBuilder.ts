
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
    console.log('just set the student builder on enrolled student builder')
    console.log(this)
    return this;
  }

  async build() {
    const studentBuilderExists = this.studentBuilder === undefined;
    console.log('student builder exists?', studentBuilderExists,)

    if (!this.studentBuilder) throw new Error('You must define the student builder');
    if (!this.classRoomBuilder) throw new Error('You must define the classroom builder');

    let classRoom = await this.classRoomBuilder.build();
    let student = await this.studentBuilder.build();
    
    const enrolledStudent = await prisma.classEnrollment.create({
      data: {
        studentId: student.id,
        classId: classRoom.id
      }
    });

    return { student, classRoom, enrolledStudent }
  }
}