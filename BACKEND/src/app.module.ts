import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { ImageTaggingModule } from "./image-tragging/image-tagging.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ImageTaggingModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
