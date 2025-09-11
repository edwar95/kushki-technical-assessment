import { BadRequestException, Controller, FileTypeValidator, MaxFileSizeValidator, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ImageTagService } from "../../application/service/image-tag.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Multer } from "multer";
import { ParseFilePipe } from "@nestjs/common";

@Controller({
    path: 'analyze',
    version: '1'
})
export class ImageTaggingController {
    constructor(
        private readonly imageTaggingService: ImageTagService
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async analyzeImage(
        @UploadedFile(
        new ParseFilePipe({
            validators: [
            new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
            new FileTypeValidator({ fileType: /(jpeg|jpg|png)$/ }),
            ],
            exceptionFactory: (errors) => new BadRequestException(errors),
        }),
        )
        file: Multer.File,
    ) {
        return this.imageTaggingService.analizeImage(file.buffer);
    }
}