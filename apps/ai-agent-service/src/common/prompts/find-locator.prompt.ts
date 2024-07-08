export const findLocatorPrompt = (data: {
  message: string;
  pageContent: string;
}) => {
  return `Here is the html content of a webpage can you help me find the correct locator for playwright using the given message from user.
# User message to find locator
\`\`\`
${data.message}
\`\`\`

# Page Content in html
\`\`\`
${data.pageContent}
\`\`\`

# Output JSON format, please provide the locator in the below json format
\`\`\`
{
    "locator": "LOCATOR_HERE"
}
\`\`\`
`;
};
