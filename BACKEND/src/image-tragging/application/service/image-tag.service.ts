import { Injectable } from "@nestjs/common";
import { IImageTag } from "../interface/image-tag.interface";
import { AIrepository } from "../../infraestructure/repository/AI.repository";

@Injectable()
export class ImageTagService implements IImageTag {
    constructor(private readonly aiRepository: AIrepository) {}

    async analizeImage(image: Buffer): Promise<JSON> {
        return this.aiRepository.analizeImage(image);
    }
}