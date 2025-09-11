import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ImageTagService } from "../../application/service/image-tag.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Multer } from "multer";

@Controller({
    path: 'analyze',
    version: '1'
})
export class ImageTaggingController {
    constructor(
        private readonly imageTaggingService: ImageTagService
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor("image", {
        limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
        fileFilter: (req, file, callback) => {
          if (!file.mimetype.match(/^image\/(jpeg|png|jpg)$/)) {
            return callback(new Error("Solo se permiten imágenes JPEG o PNG"), false);
          }
          callback(null, true);
        },
    }))
    async analyzeImage(@UploadedFile() file: Multer.File) {
        return this.imageTaggingService.analizeImage(file.buffer);
    }
}