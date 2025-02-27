import Fuse from 'fuse.js';

// Example of the structured documentation data (can be imported as well)
const documentationData = {
  "Segment": {
    "set-up-source": {
      "title": "How to Set Up a New Source in Segment",
      "link": "https://segment.com/docs/new-source",
      "description": "Follow these steps to set up a new source in Segment..."
    }
  },
  "mParticle": {
    "create-user-profile": {
      "title": "How to Create a User Profile in mParticle",
      "link": "https://docs.mparticle.com/user-profile",
      "description": "Learn how to create and manage user profiles in mParticle..."
    }
  },
  "Lytics": {
    "build-audience": {
      "title": "How to Build an Audience in Lytics",
      "link": "https://docs.lytics.com/audience-building",
      "description": "Steps to create an audience segment in Lytics..."
    }
  },
  "Zeotap": {
    "data-integration": {
      "title": "How to Integrate Data with Zeotap",
      "link": "https://docs.zeotap.com/integration",
      "description": "Instructions to integrate your data with Zeotap..."
    }
  }
};

// List of irrelevant keywords
const irrelevantKeywords = ['movie', 'weather', 'sports', 'news', 'celebrity', 'release'];

// Search function that handles user queries
const searchDocumentation = (query, documentationData) => {
  let botResponse = "Sorry, I couldn't find relevant information for your question.";

  // Normalize the query to lowercase for case-insensitive comparison
  const queryLowerCase = query.toLowerCase();

  // Check for irrelevant questions
  const irrelevantQuestion = irrelevantKeywords.some(keyword => queryLowerCase.includes(keyword));
  if (irrelevantQuestion) {
    return "Sorry, I can only help with questions related to Segment, mParticle, Lytics, and Zeotap.";
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

export { searchDocumentation };
