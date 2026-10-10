import { IsString,IsNotEmpty } from 'class-validator'

export class CreatePostDto {
    @IsNotEmpty({message:"文章标题必填"})
    readonly title: string;

    @IsNotEmpty({ message: '缺少作者信息' })
    readonly author: string;

     @IsNotEmpty({ message: '缺少文章内容' })
    readonly content: string;

     @IsNotEmpty({ message: '缺少封面' })
    readonly cover_url: string;
}
