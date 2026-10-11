import{ Entity,Column,PrimaryGeneratedColumn } from "typeorm"

@Entity('用户')
export class Auth {
    @PrimaryGeneratedColumn()
    id:string

    @Column()
    name:string

    @Column()
    password:string

}
