import Fuse from 'fuse.js';

// List of irrelevant keywords
const irrelevantKeywords = ['movie', 'weather', 'sports', 'news', 'celebrity', 'release'];

// Define the fuse search logic here
const searchDocumentation = (query, documentationData) => {
  let botResponse = "Sorry, I couldn't find relevant information for your question.";

  // Normalize the query to lowercase for case-insensitive comparison
  const queryLowerCase = query.toLowerCase();

  // Check for irrelevant questions
  const irrelevantQuestion = irrelevantKeywords.some(keyword => queryLowerCase.includes(keyword));
  if (irrelevantQuestion) {
    return "Sorry, I can only help with questions related to Segment, mParticle, Lytics, and Zeotap.";
  }

  // Check for comparison questions (e.g., Segment vs Lytics)
  if (queryLowerCase.includes('compare') || queryLowerCase.includes('difference') || queryLowerCase.includes('vs')) {
    botResponse = handleComparison(query);
    return botResponse;
  }

  // Fuse.js options
  const options = {
    includeScore: true,
    threshold: 0.3,  // Adjust for fuzzy matching
    keys: ['title', 'description'],
  };

  // Flatten the documentation data
  const docs = [];
  Object.keys(documentationData).forEach((platform) => {
    Object.keys(documentationData[platform]).forEach((docKey) => {
      const doc = documentationData[platform][docKey];
      docs.push(doc);
    });
  });

  // Create a Fuse instance
  const fuse = new Fuse(docs, options);

  // Perform the search
  const result = fuse.search(query);

  if (result.length > 0) {
    const bestMatch = result[0].item;
    botResponse = (
      <div key={bestMatch.link}>
        <a href={bestMatch.link} target="_blank" rel="noopener noreferrer">
          {bestMatch.title}
        </a>
        <p>{bestMatch.description}</p>
      </div>
    );
  }

  return botResponse;
};

// Handle comparison between CDPs
const handleComparison = (query) => {
  const lowerCaseQuery = query.toLowerCase();
  const comparisonResults = [];

  if (lowerCaseQuery.includes('segment') && lowerCaseQuery.includes('lytics')) {
    comparisonResults.push("Segment and Lytics have different audience segmentation processes. Segment is focused on data collection, while Lytics offers advanced analytics features.");
  }

  if (lowerCaseQuery.includes('segment') && lowerCaseQuery.includes('mparticle')) {
    comparisonResults.push("Segment offers more integrations for data sources, while mParticle excels in audience-level data management.");
  }

  if (lowerCaseQuery.includes('segment') && lowerCaseQuery.includes('zeotap')) {
    comparisonResults.push("Zeotap focuses on data enrichment, while Segment specializes in data routing and integrations.");
  }

  // Add more comparisons as needed

  if (comparisonResults.length === 0) {
    return "Sorry, I couldn't find a comparison for the specified platforms.";
  }

  return comparisonResults.join(' ');
};

export { searchDocumentation };
