import { AIrepository } from "../../infraestructure/repository/AI.repository";
import { ImageTaggingController } from "../../infraestructure/controller/image-tagging.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { OpenAI } from "openai";
import { ImageTagService } from "../../application/service/image-tag.service";

describe('AIrepository', () => {

    let aiRepository: AIrepository;

    const mockOpenAI = {
        chat: {
            completions: {
                create: jest.fn().mockResolvedValue({
                    choices: [
                        {
                            message: {
                                content: JSON.stringify({
                                    "tags": [
                                        { "label": "Perro", "confidence": 0.98 },
                                        { "label": "Golden Retriever", "confidence": 0.95 },
                                        { "label": "Parque", "confidence": 0.91 },
                                        { "label": "Césped", "confidence": 0.88 }
                                    ]
                                })
                            }
                        }
                    ]
                }),
            },
        },
    };

    beforeEach( async() => {
            const app: TestingModule = await Test.createTestingModule({
            controllers: [ImageTaggingController],
            providers: [
                ImageTagService,
                AIrepository,
                {
                    provide: OpenAI,
                    useValue: mockOpenAI,
                },
            ],
            }).compile();
    
            aiRepository = app.get<AIrepository>(AIrepository);
     });

    it('should be defined', async () => {
        const response = await aiRepository.analizeImage(Buffer.from(''));
        const tags = response['tags'];
        expect(tags).toBeDefined();
        expect(tags.length).toBeGreaterThan(0);
        expect(response).toBeDefined();
    })

    it('should return error', async () => {

        const app: TestingModule = await Test.createTestingModule({
            controllers: [ImageTaggingController],
            providers: [
                ImageTagService,
                AIrepository,
                {
                    provide: OpenAI,
                    useValue: new Error('Error al conectar con OpenAI'),
                },
        ],
        }).compile();

        aiRepository = app.get<AIrepository>(AIrepository);

        try {
            await aiRepository.analizeImage(Buffer.from(''));
        } catch (error) {
            expect(error).toBeDefined();
        }
    })
})