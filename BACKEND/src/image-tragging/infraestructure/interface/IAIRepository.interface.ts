export interface IAIrepository {
    analizeImage(image: Buffer): Promise<JSON>;
}