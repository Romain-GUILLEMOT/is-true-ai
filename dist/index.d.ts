interface IsTrueAIOptions {
    apiKey: string;
}
declare function initializeOpenAI(options: IsTrueAIOptions): void;
declare function isTrueAI(value: string): Promise<boolean>;
export { isTrueAI, initializeOpenAI };
