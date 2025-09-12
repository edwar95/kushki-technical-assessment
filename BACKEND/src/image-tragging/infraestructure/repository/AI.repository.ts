import { Injectable } from "@nestjs/common";
import { IAIrepository } from "../interface/IAIRepository.interface";
import { OpenAI } from "openai";

@Injectable()
export class AIrepository implements IAIrepository {
    constructor(
        private readonly aiClient: OpenAI,
    ) {
    }

    async analizeImage(image: Buffer): Promise<JSON> {
        let jsonData ;
        try {
            const imageBase64 = image.toString('base64');

            const response = await this.aiClient.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "user", 
                        content: [
                            { type: "text", text: "Analiza esta imagen y devuelve solo un JSON con etiquetas y su confianza, en español, así: {\"tags\":[{\"label\":\"...\",\"confidence\":0.9}]}" },
                            { type: "image_url", image_url: { url: `data:image/jpg;base64,${imageBase64}` } 
                        }] 
                    }],
            });

            const rawContent = response.choices[0].message.content;

            const cleaned = rawContent?.replace(/```json\s*|```/g, "").trim();

            jsonData = JSON.parse(cleaned || "");
        } catch (error) {
            console.error("Error al parsear JSON:", error);
        }

        return jsonData;
    }
}