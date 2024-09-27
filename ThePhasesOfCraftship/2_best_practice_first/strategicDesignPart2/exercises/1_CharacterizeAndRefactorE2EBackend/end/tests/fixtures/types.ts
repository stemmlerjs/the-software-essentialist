interface StudentAssignment {
  studentId: string;
  assignmentId: string;
  grade: string | null;
  status: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
}

interface ClassRoom {
  id: string;
  name: string;
}

interface EnrolledStudent {
  studentId: string;
  classId: string;
}

interface Assignment {
  id: string;
  classId: string;
  title: string;
}

export { Assignment, ClassRoom, EnrolledStudent, Student, StudentAssignment };