export interface Project {
  slug: string;
  title: string;
  tag: string;
  timeline: string;
  desc: string;
  featured: boolean;
  experimental: boolean;
  featuredDetail?: string;
  caseStudy: {
    challenge: string;
    approach: string;
    solution: string;
    results: string[];
    techStack: string[];
    testimonial?: { quote: string; author: string; role: string };
  };
}

const projects: Project[] = [
  {
    slug: "custom-ai-agents",
    title: "Custom AI Agents",
    tag: "AI AGENTS",
    timeline: "2-4 WEEKS",
    desc: "Intelligent conversational agents trained on client data for automated support and sales.",
    featured: true,
    experimental: false,
    featuredDetail: "Built for enterprises scaling operations",
    caseStudy: {
      challenge:
        "A growing SaaS company was drowning in repetitive support tickets. Their team spent 70% of their time answering the same questions, leaving no bandwidth for complex issues or proactive customer success.",
      approach:
        "We analyzed 12 months of support data to identify patterns, then designed a multi-agent architecture where specialized bots handle different query types — billing, onboarding, technical troubleshooting — with seamless handoff to humans when needed.",
      solution:
        "A conversational AI system trained on the client's knowledge base, integrated with their CRM and ticketing tools. The agents understand context, remember past interactions, and escalate intelligently based on sentiment and complexity.",
      results: [
        "72% reduction in first-response time",
        "58% of tickets resolved without human intervention",
        "Customer satisfaction score improved from 3.8 to 4.6",
        "Support team now focuses on strategic accounts",
      ],
      techStack: ["GPT-4", "LangChain", "Pinecone", "Next.js", "PostgreSQL", "Redis"],
      testimonial: {
        quote:
          "We went from overwhelmed to proactive in weeks. The AI agents feel like a natural extension of our team.",
        author: "Priya Sharma",
        role: "Head of Support, ScaleUp SaaS",
      },
    },
  },
  {
    slug: "workflow-automation-suite",
    title: "Workflow Automation Suite",
    tag: "AUTOMATION",
    timeline: "3-5 WEEKS",
    desc: "End-to-end automation pipeline from data ingestion to decision-making and execution.",
    featured: true,
    experimental: false,
    featuredDetail: "From messy processes to clean systems",
    caseStudy: {
      challenge:
        "A logistics company managed operations across spreadsheets, emails, and phone calls. Delays in data entry caused shipment errors, and the team spent hours reconciling information across systems.",
      approach:
        "We mapped every manual process, identified bottlenecks, and designed an event-driven automation pipeline. Each step triggers the next automatically — from order intake to dispatch confirmation.",
      solution:
        "An end-to-end automation suite that ingests orders from multiple channels, validates data, assigns routes using AI optimization, and sends real-time updates to drivers and customers.",
      results: [
        "85% reduction in manual data entry",
        "40% faster order-to-dispatch cycle",
        "Error rate dropped from 12% to under 2%",
        "Team reallocated 30 hours/week to growth tasks",
      ],
      techStack: ["Python", "Temporal", "FastAPI", "PostgreSQL", "RabbitMQ", "React"],
    },
  },
  {
    slug: "e-commerce-ai-platform",
    title: "E-Commerce AI Platform",
    tag: "WEB APPS",
    timeline: "4-6 WEEKS",
    desc: "Full-stack e-commerce platform with AI-powered recommendations and inventory management.",
    featured: true,
    experimental: false,
    featuredDetail: "Smart products that learn and improve",
    caseStudy: {
      challenge:
        "An online retailer with 10,000+ SKUs struggled with generic product recommendations and frequent stockouts. Their existing platform treated every customer the same, leading to low conversion rates.",
      approach:
        "We built a recommendation engine that learns from browsing behavior, purchase history, and seasonal trends. Paired it with an inventory forecasting model that predicts demand 30 days out.",
      solution:
        "A full-stack e-commerce platform with AI woven into every layer — personalized storefronts, smart search, dynamic pricing suggestions, and automated reorder triggers when stock hits predicted thresholds.",
      results: [
        "34% increase in average order value",
        "Stockouts reduced by 60%",
        "Conversion rate improved from 2.1% to 3.8%",
        "Return rate decreased by 15% with better recommendations",
      ],
      techStack: ["Next.js", "TypeScript", "TensorFlow", "Stripe", "PostgreSQL", "Vercel"],
      testimonial: {
        quote:
          "Our customers now say the site feels like it knows them. Revenue jumped in the first month.",
        author: "Arjun Mehta",
        role: "Founder, ShopEase",
      },
    },
  },
  {
    slug: "crm-dashboard-system",
    title: "CRM & Dashboard System",
    tag: "INTERNAL TOOLS",
    timeline: "3-5 WEEKS",
    desc: "Role-based dashboards with smart notifications, approvals, and automated workflows.",
    featured: true,
    experimental: false,
    featuredDetail: "Ops dashboards + approvals + automations",
    caseStudy: {
      challenge:
        "A mid-size agency managed client relationships across Notion, Google Sheets, and Slack. No single source of truth meant deals fell through cracks and handoffs between teams were chaotic.",
      approach:
        "We designed a unified CRM with role-based views — sales sees pipeline, delivery sees timelines, leadership sees revenue. Added smart notifications that surface what matters to each role.",
      solution:
        "A custom CRM and dashboard system with automated workflows for approvals, task assignments, and client communication. Integrates with existing tools so nothing changes overnight.",
      results: [
        "100% pipeline visibility for leadership",
        "Deal close rate improved by 22%",
        "Client onboarding time cut from 5 days to 1",
        "Zero deals lost to handoff gaps in 6 months",
      ],
      techStack: ["React", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS", "Resend"],
    },
  },
  {
    slug: "custom-gpt-knowledge-base",
    title: "Custom GPT Knowledge Base",
    tag: "CUSTOM GPT",
    timeline: "2-3 WEEKS",
    desc: "Private AI assistant trained on internal docs — with citations, permissions, and audit trails.",
    featured: true,
    experimental: false,
    featuredDetail: "Private search + chat over your knowledge",
    caseStudy: {
      challenge:
        "A consulting firm had 5 years of reports, playbooks, and case studies buried in shared drives. New hires took months to get up to speed, and senior consultants wasted time answering the same internal questions.",
      approach:
        "We built a retrieval-augmented generation (RAG) system that indexes all internal documents, respects access permissions, and provides cited answers so users can verify the source.",
      solution:
        "A private GPT assistant accessible via web and Slack. It searches across documents, provides answers with page-level citations, logs every query for compliance, and respects team-level access controls.",
      results: [
        "New hire ramp-up time reduced from 3 months to 3 weeks",
        "90% of internal queries answered without human help",
        "Full audit trail for compliance and governance",
        "Senior consultants saved 8+ hours/week",
      ],
      techStack: ["OpenAI API", "Pinecone", "Next.js", "Supabase", "LangChain", "Slack API"],
    },
  },
  {
    slug: "ai-powered-mobile-app",
    title: "AI-Powered Mobile App",
    tag: "MOBILE APPS",
    timeline: "4-8 WEEKS",
    desc: "Mobile application with AI features — smart cameras, voice assistants, personalized experiences.",
    featured: false,
    experimental: false,
    caseStudy: {
      challenge:
        "A fitness startup wanted to differentiate with AI-powered form correction and personalized workout plans, but their existing app was a basic timer with pre-built routines.",
      approach:
        "We integrated on-device pose estimation for real-time form feedback and built a recommendation engine that adapts workouts based on user progress, recovery time, and goals.",
      solution:
        "A cross-platform mobile app with a smart camera for form analysis, voice-guided workouts, and an AI coach that adjusts plans weekly based on performance data.",
      results: [
        "User retention improved by 45% in 90 days",
        "4.7 star rating on both app stores",
        "Average session duration increased from 18 to 32 minutes",
        "Featured in App Store 'New Apps We Love'",
      ],
      techStack: ["React Native", "TensorFlow Lite", "Firebase", "Node.js", "Expo", "RevenueCat"],
    },
  },
  {
    slug: "data-analytics-platform",
    title: "Data Analytics Platform",
    tag: "DATA ANALYTICS",
    timeline: "3-5 WEEKS",
    desc: "Advanced analytics dashboard with predictive insights and automated reporting.",
    featured: false,
    experimental: false,
    caseStudy: {
      challenge:
        "A retail chain with 50+ stores generated mountains of sales data but had no way to extract actionable insights. Monthly reports were manually assembled and always late.",
      approach:
        "We built a real-time analytics platform that ingests POS data, applies predictive models for demand forecasting, and auto-generates reports tailored to each stakeholder.",
      solution:
        "A centralized analytics dashboard with store-level drill-downs, anomaly detection alerts, and AI-generated weekly summaries sent directly to store managers and executives.",
      results: [
        "Reports delivered in real-time instead of monthly",
        "Inventory waste reduced by 28%",
        "Identified $2.4M in pricing optimization opportunities",
        "Decision-making speed improved across all levels",
      ],
      techStack: ["Python", "Apache Kafka", "ClickHouse", "React", "D3.js", "Metabase"],
    },
  },
  {
    slug: "api-integration-hub",
    title: "API Integration Hub",
    tag: "API DEVELOPMENT",
    timeline: "2-4 WEEKS",
    desc: "Unified API layer connecting multiple services with AI-powered data transformation.",
    featured: false,
    experimental: false,
    caseStudy: {
      challenge:
        "A fintech company used 12 different third-party services for payments, KYC, notifications, and reporting. Each integration was custom-built, fragile, and impossible to maintain.",
      approach:
        "We designed a unified API gateway that normalizes data formats across services, handles retries and fallbacks automatically, and uses AI to map between incompatible schemas.",
      solution:
        "A centralized integration hub with standardized connectors, real-time health monitoring, automatic schema mapping, and a developer portal for internal teams to onboard new services in hours instead of weeks.",
      results: [
        "Integration time for new services cut from 2 weeks to 2 hours",
        "99.97% uptime across all connected services",
        "Maintenance overhead reduced by 75%",
        "Enabled 3 new product launches in one quarter",
      ],
      techStack: ["Node.js", "GraphQL", "Redis", "Docker", "Kong", "TypeScript"],
    },
  },
  {
    slug: "chat-system-prototype",
    title: "Chat System Prototype",
    tag: "PROTOTYPE",
    timeline: "3-5 DAYS",
    desc: "Real-time chat system with AI moderation and smart routing.",
    featured: false,
    experimental: true,
    caseStudy: {
      challenge:
        "A community platform needed a chat system that could handle thousands of concurrent users while automatically moderating toxic content and routing support requests to the right team.",
      approach:
        "We built a lightweight prototype using WebSockets for real-time messaging, with an AI moderation layer that classifies messages in under 50ms and routes flagged content to moderators.",
      solution:
        "A real-time chat system with instant message delivery, AI-powered toxicity detection, smart routing based on message intent, and a moderator dashboard for edge cases.",
      results: [
        "Prototype shipped in 4 days",
        "Handles 5,000+ concurrent connections",
        "95% accuracy in toxicity detection",
        "Moderation workload reduced by 80%",
      ],
      techStack: ["WebSocket", "Node.js", "Redis", "OpenAI API", "React", "Tailwind CSS"],
    },
  },
  {
    slug: "ai-search-engine",
    title: "AI Search Engine",
    tag: "SEARCH",
    timeline: "1-2 WEEKS",
    desc: "Semantic search engine that understands intent, not just keywords.",
    featured: false,
    experimental: true,
    caseStudy: {
      challenge:
        "An internal knowledge platform had thousands of articles but keyword search returned irrelevant results. Users gave up searching and asked colleagues directly, creating bottlenecks.",
      approach:
        "We replaced keyword matching with semantic search using vector embeddings. The system understands what users mean, not just what they type, and ranks results by relevance and recency.",
      solution:
        "A semantic search engine that indexes content as vector embeddings, supports natural language queries, provides instant previews, and learns from click-through data to improve over time.",
      results: [
        "Search success rate improved from 35% to 89%",
        "Average time to find answers dropped by 70%",
        "Internal support tickets reduced by 40%",
        "Shipped MVP in 9 days",
      ],
      techStack: ["OpenAI Embeddings", "Pinecone", "Next.js", "TypeScript", "Tailwind CSS"],
    },
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getExperimentalProjects(): Project[] {
  return projects.filter((p) => p.experimental);
}

export function getMainProjects(): Project[] {
  return projects.filter((p) => !p.experimental);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
