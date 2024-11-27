"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTrueAI = isTrueAI;
exports.initializeOpenAI = initializeOpenAI;
const openai_1 = __importDefault(require("openai"));
let openaiInstance = null;
function initializeOpenAI(options) {
    openaiInstance = new openai_1.default({
        apiKey: options.apiKey,
    });
}
async function isTrueAI(value) {
    var _a;
    if (!openaiInstance) {
        throw new Error("OpenAI is not initialized. Call initializeOpenAI first.");
    }
    try {
        const completion = await openaiInstance.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a truth evaluator. Respond only with 'true' or 'false'. Entry value is coming from JavaScript.",
                },
                {
                    role: "user",
                    content: `Is this statement true? "${value}"`,
                },
            ],
            temperature: 0,
            max_tokens: 5,
        });
        const result = (_a = completion.choices[0].message.content) === null || _a === void 0 ? void 0 : _a.toLowerCase().trim();
        return result === "true";
    }
    catch (error) {
        console.error("Error calling OpenAI:", error);
        throw error;
    }
}
