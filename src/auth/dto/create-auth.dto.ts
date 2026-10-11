import{IsNotEmpty} from 'class-validator'
export class CreateAuthDto {


    @IsNotEmpty({message:"姓名不能为空"})
    name:string

    @IsNotEmpty({message:"密码不能为空"})
    password:string

}
