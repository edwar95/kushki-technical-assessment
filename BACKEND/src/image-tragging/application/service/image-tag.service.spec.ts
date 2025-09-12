import { AIrepository } from "../../infraestructure/repository/AI.repository";
import { ImageTaggingController } from "../../infraestructure/controller/image-tagging.controller";
import { ImageTagService } from "./image-tag.service";
import { Test, TestingModule } from "@nestjs/testing";
import { OpenAI } from "openai";
describe('ImageTagService', () => {

    let imageTaggService: ImageTagService;

    const mockAIrepository = {
        analizeImage: jest.fn().mockResolvedValue({
            "tags": [
            { "label": "Perro", "confidence": 0.98 },
            { "label": "Golden Retriever", "confidence": 0.95 },
            { "label": "Parque", "confidence": 0.91 },
            { "label": "Césped", "confidence": 0.88 }
            ]
        }),
    };

    beforeEach( async() => {
        const app: TestingModule = await Test.createTestingModule({
        controllers: [ImageTaggingController],
        providers: [
            ImageTagService,
            {
                provide: AIrepository,
                useValue: mockAIrepository, // <-- inyectas el mock
            },
        ],
        }).compile();

        imageTaggService = app.get<ImageTagService>(ImageTagService);
    });

    it('should be defined', async () => {
        const response = await imageTaggService.analizeImage(Buffer.from(''));
        const tags = response['tags'];
        expect(tags).toBeDefined();
        expect(tags.length).toBeGreaterThan(0);
        expect(response).toBeDefined();
    });
});