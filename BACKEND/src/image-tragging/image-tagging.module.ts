import { Module } from "@nestjs/common";
import { ImageTaggingController } from "./infraestructure/controller/image-taggint.controller";
import { ImageTagService } from "./application/service/image-tag.service";
import { AIrepository } from "./infraestructure/repository/AI.repository";
import { ConfigService } from "@nestjs/config";
import { OpenAI } from "openai";

@Module({
    controllers: [ImageTaggingController],
    providers: [
        ImageTagService, 
        AIrepository,
        {
            provide: OpenAI,
            useFactory: (configService: ConfigService) => {
              return new OpenAI({
                apiKey: configService.get<string>("OPENAI_API_KEY"),
              });
            },
            inject: [ConfigService],
          },
    ],
})
export class ImageTaggingModule {}