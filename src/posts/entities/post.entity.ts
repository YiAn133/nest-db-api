import { text } from 'stream/consumers';
import { Column, Entity, PrimaryColumn ,PrimaryGeneratedColumn} from 'typeorm';



@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id:number

    @Column({length:50})
    title:string

   @Column({length:20})
    author:string

    @Column({type:'text'})
    content:string


    @Column({ default: '' })
    thumb_url: string;

    @Column({type:'timestamp' , default:() => 'CURRENT_TIMESTAMP'})
    create_time:Date

    @Column({type:'timestamp' , default:() => 'CURRENT_TIMESTAMP'})
    update_time:Date

}
