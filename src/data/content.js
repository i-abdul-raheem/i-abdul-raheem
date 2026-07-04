export const siteContent = {
  home: {
    title: "Abdul's Lab",
    subtitle: 'NLP Engineer and M.Sc. Data Science student building scalable AI solutions — from LLM fine-tuning and RAG systems to full-stack applications.',
    skills: ['NLP', 'Machine Learning', 'LLMs & RAG'],
    cta: {
      primary: 'Explore projects',
      secondary: 'Browse notes'
    },
    spotlight: {
      label: 'Current focus',
      description: 'Pursuing an M.Sc. in Data Science at Philipps-Universität Marburg while building production NLP systems at Devster Labs.',
      bullets: ['LLM fine-tuning and automated text analysis', 'RAG systems for internal knowledge search', 'Full-stack AI integration with Python and JavaScript']
    },
    sections: {
      writing: {
        title: 'Selected Writing',
        viewAllLabel: 'View all writing'
      },
      projects: {
        title: 'Selected Projects',
        viewAllLabel: 'View all projects'
      }
    }
  },
  blog: {
    title: 'Blog',
    intro: 'Notes on NLP, large language models, RAG pipelines, and the engineering behind scalable AI systems.'
  },
  about: {
    title: 'About',
    intro: 'NLP Engineer and M.Sc. Data Science student with experience in LLM fine-tuning, RAG systems, automated text analysis, and full-stack development.',
    body: [
      'I build scalable AI solutions that combine language models with real-world data — from resume ranking and automated annotation to RAG-powered search across internal databases.',
      'At Devster Labs, I develop NLP systems that automate candidate pre-screening, fine-tune LLMs for domain-specific tasks, and integrate models into production workflows.',
      'I am currently pursuing a Master\'s in Data Science at Philipps-Universität Marburg, with coursework in NLP, Machine Learning, Deep Learning, and Big Data Analytics.'
    ]
  },
  projects: {
    title: 'Projects',
    intro: 'A selection of NLP and AI systems built across professional roles — from automated text analysis and LLM fine-tuning to RAG chatbots and full-stack AI applications.'
  }
};

export const posts = [
  {
    slug: 'building-rag-systems',
    title: 'Designing RAG Systems for Internal Knowledge Search',
    href: '/blog/building-rag-systems',
    date: '2025-11-14',
    excerpt: 'How retrieval-augmented generation connects language models to internal databases for targeted, context-aware search.',
    tags: ['rag', 'llm', 'nlp'],
    body: [
      'Retrieval-augmented generation bridges the gap between general-purpose language models and organization-specific knowledge.',
      'The key engineering decisions sit in the retrieval layer: chunking strategy, embedding model selection, vector store design, and how aggressively to filter results before passing them to the LLM.',
      'In production systems, the goal is not just accurate answers but also traceability and scalability as underlying data grows.'
    ]
  },
  {
    slug: 'llm-fine-tuning-annotation',
    title: 'Fine-Tuning LLMs for Domain-Specific Annotation',
    href: '/blog/llm-fine-tuning-annotation',
    date: '2025-06-20',
    excerpt: 'Practical lessons from fine-tuning a large language model for automatic audio-data annotation, reaching 92% accuracy.',
    tags: ['fine-tuning', 'llm', 'annotation'],
    body: [
      'General-purpose language models handle broad tasks well, but domain-specific annotation often requires fine-tuning on curated examples.',
      'The pipeline starts with data quality: representative samples, consistent labeling guidelines, and enough volume to cover edge cases.',
      'Reaching high accuracy is less about model size and more about alignment between training data and production inputs.'
    ]
  }
];

export const projects = [
  {
    slug: 'resume-ranking-system',
    title: 'NLP Resume Ranking System',
    href: '/projects/resume-ranking-system',
    year: '2024–2026',
    tags: ['Python', 'NLP', 'Machine Learning'],
    description: 'An NLP-based resume ranking system that automates candidate pre-screening, achieving 90% efficiency gains.',
    details: 'Built at Devster Labs to replace manual resume review with automated scoring and ranking.',
    body: [
      'This system applies NLP to parse, analyze, and rank candidate resumes against open positions.',
      'The pipeline handles document ingestion, text extraction, semantic matching, and ranked output for hiring teams.',
      'Efficiency improvements reached 90% compared to manual pre-screening.'
    ]
  },
  {
    slug: 'llm-audio-annotation',
    title: 'LLM Fine-Tuning for Audio Annotation',
    href: '/projects/llm-audio-annotation',
    year: '2024–2026',
    tags: ['PyTorch', 'LLM', 'Fine-Tuning'],
    description: 'Fine-tuned a large language model for automatic audio-data annotation, reaching 92% accuracy.',
    details: 'Developed at Devster Labs to automate the labeling of audio-derived text data.',
    body: [
      'Manual annotation of audio data is slow and inconsistent at scale.',
      'The workflow covers data preparation, model selection, fine-tuning, evaluation, and deployment.',
      'The fine-tuned model achieved 92% accuracy with periodic human oversight.'
    ]
  },
  {
    slug: 'rag-candidate-chatbot',
    title: 'RAG Candidate Search Chatbot',
    href: '/projects/rag-candidate-chatbot',
    year: '2024–2026',
    tags: ['RAG', 'LLM', 'FastAPI'],
    description: 'A RAG-powered chatbot for targeted candidate searches across internal databases.',
    details: 'Designed at Devster Labs for natural-language queries over internal candidate records.',
    body: [
      'The chatbot combines RAG with internal candidate databases for conversational talent search.',
      'The architecture includes embedding, vector search, context assembly, and LLM response generation.',
      'Grounding answers in database records avoids hallucination while making talent data accessible.'
    ]
  },
  {
    slug: 'consoledot-ai-platform',
    title: 'ConsoleDot AI Platform',
    href: '/projects/consoledot-ai-platform',
    year: '2023–2024',
    tags: ['Next.js', 'Generative AI', 'React'],
    description: 'A collaborative platform for creatives using Next.js and generative AI, plus a dating app with AI auto-suggestions.',
    details: 'Built at ConsoleDot with full-stack ownership of AI-powered web applications.',
    body: [
      'Developed a collaborative creative platform using generative AI and Next.js for NFT creation.',
      'Led technical development of a dating app with AI-powered auto-suggestion features.',
      'Both projects required API design, frontend implementation, AI integration, and team coordination.'
    ]
  }
];
