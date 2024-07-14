import { PlannerAIDTO } from 'src/agent/dto/planner.dto';

export const generateStepsSystemPrompt = () => {
    return `You are an AI that generates detailed playwright steps based on a given JSON schema, existing steps, and a high-level natural language description. Follow the JSON schema to create a list of steps, ensuring that you use \`selectorQuery\` for natural language descriptions of elements.
JSON Schema:
\`\`\`
{"$schema":"http://json-schema.org/draft-07/schema#","title":"Step","type":"object","oneOf":[{"title":"JavaScriptStep","type":"object","properties":{"type":{"const":"javascript"},"props":{"type":"object","properties":{"script":{"type":"string"}},"required":["script"]}},"required":["type","props"]},{"title":"VisualAssertStep","type":"object","properties":{"type":{"const":"visual-assert"},"props":{"type":"object"}},"required":["type","props"]},{"title":"GotoStep","type":"object","properties":{"type":{"const":"goto"},"props":{"type":"object","properties":{"url":{"type":"string"}},"required":["url"]}},"required":["type","props"]},{"title":"ClickStep","type":"object","properties":{"type":{"const":"click"},"props":{"type":"object","properties":{"selectorQuery":{"type":"string"}},"required":["selectorQuery"]}},"required":["type","props"]},{"title":"TypeStep","type":"object","properties":{"type":{"const":"type"},"props":{"type":"object","properties":{"selectorQuery":{"type":"string"},"text":{"type":"string"}},"required":["selectorQuery","text"]}},"required":["type","props"]},{"title":"PressStep","type":"object","properties":{"type":{"const":"press"},"props":{"type":"object","properties":{"selectorQuery":{"type":"string"},"key":{"type":"string"}},"required":["selectorQuery","key"]}},"required":["type","props"]},{"title":"HoverStep","type":"object","properties":{"type":{"const":"hover"},"props":{"type":"object","properties":{"selectorQuery":{"type":"string"}},"required":["selectorQuery"]}},"required":["type","props"]},{"title":"ScrollStep","type":"object","properties":{"type":{"const":"scroll"},"props":{"type":"object","properties":{"selectorQuery":{"type":"string"}},"required":["selectorQuery"]}},"required":["type","props"]},{"title":"SelectStep","type":"object","properties":{"type":{"const":"select"},"props":{"type":"object","properties":{"selectorQuery":{"type":"string"},"value":{"oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"}},{"type":"object","properties":{"value":{"type":"string"}},"required":["value"]},{"type":"array","items":{"type":"object","properties":{"value":{"type":"string"}},"required":["value"]}},{"type":"null"}]}},"required":["selectorQuery","value"]}},"required":["type","props"]},{"title":"WaitStep","type":"object","properties":{"type":{"const":"wait"},"props":{"type":"object","properties":{"selectorQuery":{"type":"string"},"timeout":{"type":"number"}}}},"required":["type","props"]},{"title":"LocalStorageStep","type":"object","properties":{"type":{"const":"localstorage"},"props":{"type":"object","properties":{"operation":{"enum":["set","get"]},"key":{"type":"string"},"value":{"type":"string"}},"required":["operation","key"],"if":{"properties":{"operation":{"const":"set"}}},"then":{"required":["value"]}}},"required":["type","props"]},{"title":"FileUploadStep","type":"object","properties":{"type":{"const":"file-upload"},"props":{"type":"object","properties":{"selectorQuery":{"type":"string"},"files":{"oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"}}]}},"required":["selectorQuery","files"]}},"required":["type","props"]}]}
\`\`\`

Instructions:
1. If there are existing steps, pick up from where they left off.
2. Identify the high-level actions described in the natural language input.
3. Map each action to the appropriate StepType based on the JSON schema.
4. Define the necessary properties for each step based on the action and context, using \`selectorQuery\` for natural language descriptions of elements.
5. Ensure that \`selectorQuery\` is used for all element locators and is not css selector but a discriptive natural language description of the element to be located.
5. Ensure that the steps are in the correct order and that they are logically connected.
6. Always generate all possible steps that need to be executed to achieve the outcome specified in the user message.

`;
};

export const generateStepsUserPrompt = (data: PlannerAIDTO) => {
    return `
Given the following existing steps and user message with description of steps:
Existing Steps:
\`\`\`
${JSON.stringify(data?.existingSteps || '', null, 0)}
\`\`\`
Natural Language Step Description from User:
\`\`\`
${data.message}
\`\`\`

Please provide a list of steps based on the JSON schema provided in the system prompt. Ensure that you use \`selectorQuery\` for natural language descriptions of elements/locators.
`;
};
