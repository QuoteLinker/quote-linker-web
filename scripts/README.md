# QuoteLinker Content Scripts

This directory contains various scripts for automating content management and enhancement.

## Available Scripts

### `link-mdx.cjs`

Automatically adds internal links to keywords in MDX content files.

```bash
npm run link-mdx
```

### `generateFAQs.cjs`

Generates FAQ sections for MDX content files based on their content.

```bash
npm run generate-faqs
```

**Requirements:**
- An OpenAI API key (set in `.env` file as `OPENAI_API_KEY`)
- The script processes MDX files in the `src/content/learn` directory
- For each file, it sends the content to an AI model to generate relevant FAQs
- The generated FAQs are added at the end of the MDX file

### `updateMetaDescriptions.cjs` 

Updates or adds meta descriptions to MDX files based on their content.

```bash
npm run update-meta
```

## How to Run

1. Make sure you have set up the required API keys in your `.env` file
2. Install dependencies: `npm install`
3. Run the desired script using npm commands

## FAQ Component

The generated FAQ sections use a custom FAQ component. Make sure your project has 
`<FAQ>` and `<FAQItem>` components available.

Example implementation:

```jsx
// components/FAQ.jsx
export function FAQ({ children }) {
  return <div className="faq-container">{children}</div>;
}

// components/FAQItem.jsx
export function FAQItem({ question, children }) {
  return (
    <details className="faq-item">
      <summary className="faq-question">{question}</summary>
      <div className="faq-answer">{children}</div>
    </details>
  );
}
```

## File Structure

- `/scripts` - Content automation scripts
- `/src/content/learn` - MDX content files
- `/src/components` - React components including FAQ components

## Troubleshooting

- If scripts fail due to API rate limits, try adding a delay between file processing
- Check your API keys and permissions
- For execution errors, ensure the scripts have executable permissions (`chmod +x scriptname.cjs`)
