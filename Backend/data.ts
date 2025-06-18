export interface AITool {
  id: number;
  name: string;
  category: string;
  url: string;
  excerpt: string;
  tags: string[];
  pricing: string;
}

export const aiTools: AITool[] = [
  {
    id: 1,
    name: "ChatGPT",
    category: "Writing",
    url: "https://chat.openai.com",
    excerpt: "Advanced conversational AI for content creation, research, and brainstorming.",
    tags: ["AI Assistant", "Chatbot", "Content Generation"],
    pricing: "Freemium"
  },
  {
    id: 2,
    name: "Claude",
    category: "Writing",
    url: "https://claude.ai",
    excerpt: "Anthropic's AI assistant for writing, analysis, and complex reasoning tasks.",
    tags: ["AI Assistant", "Analysis", "Reasoning"],
    pricing: "Freemium"
  },
  {
    id: 3,
    name: "DALL-E 3",
    category: "Image Generation",
    url: "https://openai.com/dall-e-3",
    excerpt: "State-of-the-art AI image generator from text descriptions.",
    tags: ["Image Generation", "Creative", "Art"],
    pricing: "Paid"
  },
  {
    id: 4,
    name: "Midjourney",
    category: "Image Generation",
    url: "https://midjourney.com",
    excerpt: "Professional AI art generator known for high-quality, artistic images.",
    tags: ["Image Generation", "Art", "Professional"],
    pricing: "Paid"
  },
  {
    id: 5,
    name: "GitHub Copilot",
    category: "Coding",
    url: "https://github.com/features/copilot",
    excerpt: "AI pair programmer that helps you write code faster with intelligent suggestions.",
    tags: ["Code Assistant", "Programming", "Productivity"],
    pricing: "Paid"
  },
  {
    id: 6,
    name: "Cursor",
    category: "Coding",
    url: "https://cursor.sh",
    excerpt: "AI-powered code editor built for pair programming with AI.",
    tags: ["Code Editor", "AI Integration", "Development"],
    pricing: "Freemium"
  },
  {
    id: 7,
    name: "Grammarly",
    category: "Writing",
    url: "https://grammarly.com",
    excerpt: "AI writing assistant for grammar, style, and tone improvement.",
    tags: ["Writing Assistant", "Grammar", "Style"],
    pricing: "Freemium"
  },
  {
    id: 8,
    name: "Notion AI",
    category: "Productivity",
    url: "https://notion.so/ai",
    excerpt: "AI features integrated into Notion for content creation and organization.",
    tags: ["Productivity", "Organization", "Content"],
    pricing: "Freemium"
  },
  {
    id: 9,
    name: "Loom AI",
    category: "Video",
    url: "https://loom.com",
    excerpt: "AI-powered video creation and editing for screen recordings and presentations.",
    tags: ["Video", "Screen Recording", "Presentations"],
    pricing: "Freemium"
  },
  {
    id: 10,
    name: "RunwayML",
    category: "Video",
    url: "https://runwayml.com",
    excerpt: "Advanced AI video generation and editing tools for creators.",
    tags: ["Video Generation", "Editing", "Creative"],
    pricing: "Freemium"
  },
  {
    id: 11,
    name: "Perplexity",
    category: "Research",
    url: "https://perplexity.ai",
    excerpt: "AI-powered search engine that provides detailed answers with citations.",
    tags: ["Search", "Research", "Citations"],
    pricing: "Freemium"
  },
  {
    id: 12,
    name: "Jasper",
    category: "Writing",
    url: "https://jasper.ai",
    excerpt: "AI content creation platform for marketing copy and business writing.",
    tags: ["Marketing", "Content Creation", "Business"],
    pricing: "Paid"
  },
  {
    id: 13,
    name: "Copy.ai",
    category: "Writing",
    url: "https://copy.ai",
    excerpt: "AI copywriting tool for marketing content, emails, and social media.",
    tags: ["Copywriting", "Marketing", "Social Media"],
    pricing: "Freemium"
  },
  {
    id: 14,
    name: "Stable Diffusion",
    category: "Image Generation",
    url: "https://stability.ai",
    excerpt: "Open-source AI image generator with customizable models and fine-tuning.",
    tags: ["Open Source", "Customizable", "Image Generation"],
    pricing: "Free"
  },
  {
    id: 15,
    name: "Eleven Labs",
    category: "Audio",
    url: "https://elevenlabs.io",
    excerpt: "AI voice generation and cloning for realistic speech synthesis.",
    tags: ["Voice Generation", "Audio", "Speech"],
    pricing: "Freemium"
  },
  {
    id: 16,
    name: "Zapier AI",
    category: "Productivity",
    url: "https://zapier.com/ai",
    excerpt: "AI-powered automation for connecting apps and streamlining workflows.",
    tags: ["Automation", "Workflows", "Integration"],
    pricing: "Freemium"
  },
  {
    id: 17,
    name: "Replit AI",
    category: "Coding",
    url: "https://replit.com",
    excerpt: "AI coding assistant integrated into cloud development environment.",
    tags: ["Cloud IDE", "Code Assistant", "Collaboration"],
    pricing: "Freemium"
  },
  {
    id: 18,
    name: "Synthesia",
    category: "Video",
    url: "https://synthesia.io",
    excerpt: "AI video generation with realistic avatars for training and marketing content.",
    tags: ["AI Avatars", "Training", "Marketing"],
    pricing: "Paid"
  },
  {
    id: 19,
    name: "Otter.ai",
    category: "Audio",
    url: "https://otter.ai",
    excerpt: "AI meeting transcription and note-taking for better collaboration.",
    tags: ["Transcription", "Meetings", "Note-taking"],
    pricing: "Freemium"
  },
  {
    id: 20,
    name: "Canva AI",
    category: "Design",
    url: "https://canva.com",
    excerpt: "AI-powered design tools for creating graphics, presentations, and marketing materials.",
    tags: ["Design", "Graphics", "Templates"],
    pricing: "Freemium"
  }
];