"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentAssignment = void 0;
// models/StudentAssignment.ts
var sequelize_1 = require("sequelize");
var database_1 = require("../database");
var student_1 = require("./student");
var assignment_1 = require("./assignment");
var StudentAssignment = /** @class */ (function (_super) {
    __extends(StudentAssignment, _super);
    function StudentAssignment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StudentAssignment;
}(sequelize_1.Model));
exports.StudentAssignment = StudentAssignment;
StudentAssignment.init({
    studentId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: student_1.Student,
            key: "id",
        },
    },
    assignmentId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: assignment_1.Assignment,
            key: "id",
        },
    },
}, {
    sequelize: database_1.sequelize,
    tableName: "student_assignments",
});
