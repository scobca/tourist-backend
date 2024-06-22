import {
    AutoIncrement,
    Column,
    Length,
    Model,
    NotEmpty,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";

@Table
export class UsersModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @NotEmpty
    @Unique
    @Length({msg: 'Incorrect format of login. Minimal length: 4 letter, maximum: 255 letters', min: 4, max: 255})
    @Column
    login: string;

    @NotEmpty
    @Unique
    @Column
    email: string;

    @NotEmpty
    @Column
    password: string;
}