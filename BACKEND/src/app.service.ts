import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { OpenAI } from "openai";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): Promise<string> {
    return this._analyzeImage();
  }

  getOpenAiKey(): string {
    return this.configService.get<string>("OPENAI_API_KEY") ?? "";
  }

  private async _analyzeImage(): Promise<string> {
    const client = new OpenAI({
      apiKey: this.getOpenAiKey(),
    });
    const imageBuffer = fs.readFileSync("test.jpg");
    const base64Image = imageBuffer.toString("base64");

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: 'Analiza esta imagen y devuelve solo un JSON con etiquetas y su confianza, en español, así: {"tags":[{"label":"...","confidence":0.9}]}',
            },
            {
              type: "image_url",
              image_url: { url: `data:image/jpg;base64,${base64Image}` },
            },
          ],
        },
      ],
    });
    const rawContent = response.choices[0].message.content;

    // 1️⃣ Eliminar los backticks y el "json" del bloque de código
    const cleaned = rawContent?.replace(/```json\s*|```/g, "").trim();

    // 2️⃣ Parsear a objeto JSON
    let jsonData;
    try {
      jsonData = JSON.parse(cleaned || "");
    } catch (error) {
      console.error("Error al parsear JSON:", error);
    }

    return JSON.stringify(jsonData, null, 2);
  }
}
