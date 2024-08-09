export const aiAssertPrompt = (data: { assertion: string }) => {
    return `
    Here is the assertion for the screenshot provided. Can you help me assert the screenshot using the given assertion?
    
    # Assertion
    \`\`\`
    ${data.assertion}
    \`\`\`

    # Instructions for Result
    Please provide your response in JSON format according to the following schema:

    {
      "type": "object",
      "properties": {
        "assertion_result": {
          "type": "boolean",
          "description": "The result of the assertion. True if the assertion is correct, false otherwise."
        },
        "reason": {
          "type": "string",
          "description": "A brief explanation for why the assertion succeeded or failed."
        }
      },
      "required": ["assertion_result", "reason"]
    }

    Your response should look like this:

    {
      "assertion_result": false,
      "reason": "The element with text 'Submit' is not visible in the screenshot."
    }

    Replace 'false' with the actual result of your assertion (true or false), and provide a concise reason explaining the success or failure of the assertion.
    `;
};
