export interface IImageTag {
    analizeImage(image: Buffer): Promise<JSON>;
}