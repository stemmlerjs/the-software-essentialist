import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"
import * as bcrypt from "bcrypt";

@Entity(
    {
        name: "users"
    }
)
export class User {

    constructor() {
        this.password = this.generatePassword();
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Unique(["email"])
    email: string

    @Column()
    @Unique(["username"])
    username: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    password: string

    private generatePassword(): string {
        const length = 10; // Define the desired length of the password
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}<>?/"; // Define the characters to be used in the password
        let password = "";
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * chars.length);
          password += chars[randomIndex];
        }
        return bcrypt.hashSync(password, 10);
    }

}
