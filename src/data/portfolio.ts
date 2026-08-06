export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl: string;
  featured: boolean;
  size: 'large' | 'small';
  metric?: string;
  insights?: string[];
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: 'Practical experience' | 'Working knowledge' | 'Currently learning' | 'Familiar with' }[];
}

export interface JournalEntry {
  id: string;
  title: string;
  category: string;
  readingTime: string;
  date: string;
  summary: string;
}

export interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  codeSnippet?: string;
  visualizationType?: 'chart' | 'scrape' | 'cloud' | 'ai';
  description: string;
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    firstName: string;
    lastName: string;
    initials: string;
    title: string;
    location: string;
    graduation: string;
    email: string;
    github: string;
    linkedin: string;
    resume: string;
    availability: string;
  };
  projects: Project[];
  skillsData: SkillGroup[];
  journal: JournalEntry[];
  explorations: ExplorationItem[];
  statistics: { value: string; label: string }[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Lukas Weber",
    firstName: "Lukas",
    lastName: "Weber",
    initials: "LW",
    title: "IT Student | Aspiring Data Analyst",
    location: "Stuttgart, Baden-Württemberg, Germany",
    graduation: "Expected August 2026",
    email: "lukas.weber.stuttgart@example.com",
    github: "https://github.com/lukas-weber-placeholder",
    linkedin: "https://linkedin.com/in/lukas-weber-placeholder",
    resume: "#", // placeholder
    availability: "Open to internships and working-student opportunities"
  },
  projects: [
    {
      id: "proj-1",
      title: "Python Data Analysis Dashboard",
      description: "Interactive EDA dashboard for cleaning, validating, and displaying business KPI metrics.",
      longDescription: "A practical Python data analysis dashboard designed to assist business analysts. It handles tabular dataset ingestion, automatically runs cleaning pipelines, validates schemas with pandas-schema, and presents insights via interactive charts.",
      technologies: ["Python", "pandas", "NumPy", "Matplotlib", "Data cleaning", "Exploratory analysis"],
      githubUrl: "https://github.com/lukas-weber-placeholder/python-eda-dashboard",
      liveDemoUrl: "#",
      featured: true,
      size: "large",
      metric: "99.8% clean ingestion rate",
      insights: ["Automatic handle of null values", "Duplicate item detection & consolidation", "Instant statistical distributions"]
    },
    {
      id: "proj-2",
      title: "Web Scraping and Price Tracker",
      description: "Automated scraper for monitoring e-commerce price dynamics and identifying discount anomalies.",
      longDescription: "A structured scrapper engineered to track product values periodically. Uses Requests and BeautifulSoup to extract live price data, validates schemas, formats clean datasets, and compiles a historic pricing sheet in pandas.",
      technologies: ["Python", "Requests", "BeautifulSoup", "pandas", "Data validation", "Automation"],
      githubUrl: "https://github.com/lukas-weber-placeholder/web-scraping-tracker",
      liveDemoUrl: "#",
      featured: true,
      size: "small",
      metric: "Daily automatic scrape & report",
      insights: ["Robust User-Agent rotation", "Graceful rate-limit throttling", "Instant Excel/CSV generation"]
    },
    {
      id: "proj-3",
      title: "Customer Churn Analysis",
      description: "Statistical analysis pipeline to isolate main churn indicators and suggest risk mitigation strategies.",
      longDescription: "An in-depth statistical analysis analyzing user demographics and engagement trends. Uses NumPy and Matplotlib to map out drop-off correlations, helping developers identify why customers stop using a service.",
      technologies: ["Python", "pandas", "NumPy", "Matplotlib", "Statistical analysis", "Business insights"],
      githubUrl: "https://github.com/lukas-weber-placeholder/customer-churn-analysis",
      liveDemoUrl: "#",
      featured: true,
      size: "small",
      metric: "15% identified key churn drivers",
      insights: ["Cohort engagement charts", "Correlation matrices", "Actionable retention tips"]
    },
    {
      id: "proj-4",
      title: "AI-Powered Data Assistant",
      description: "Intelligent agent leveraging prompt engineering and LLM integrations to answer dataset questions.",
      longDescription: "An API-driven assistant that processes raw spreadsheet data and generates executive summaries. Interfaces with state-of-the-art LLMs to convert natural language queries into executable pandas filtering commands.",
      technologies: ["Python", "APIs", "LLM integration", "Prompt engineering", "Data processing"],
      githubUrl: "https://github.com/lukas-weber-placeholder/ai-data-assistant",
      liveDemoUrl: "#",
      featured: true,
      size: "large",
      metric: "Zero-shot natural queries to pandas",
      insights: ["Protected prompt context injection", "JSON response schema enforcement", "Clean, sandboxed evaluation environment"]
    }
  ],
  skillsData: [
    {
      category: "Programming",
      skills: [
        { name: "Python", level: "Practical experience" },
        { name: "SQL", level: "Working knowledge" },
        { name: "JavaScript", level: "Working knowledge" },
        { name: "TypeScript", level: "Familiar with" }
      ]
    },
    {
      category: "Data Analysis",
      skills: [
        { name: "pandas", level: "Practical experience" },
        { name: "NumPy", level: "Working knowledge" },
        { name: "Matplotlib", level: "Working knowledge" },
        { name: "Data cleaning", level: "Practical experience" },
        { name: "Data validation", level: "Practical experience" },
        { name: "Exploratory data analysis", level: "Practical experience" }
      ]
    },
    {
      category: "Development",
      skills: [
        { name: "Git & GitHub", level: "Practical experience" },
        { name: "React", level: "Working knowledge" },
        { name: "Vite", level: "Working knowledge" },
        { name: "REST APIs", level: "Working knowledge" },
        { name: "Web scraping", level: "Practical experience" }
      ]
    },
    {
      category: "Current learning",
      skills: [
        { name: "Cloud computing", level: "Currently learning" },
        { name: "AI & LLM applications", level: "Currently learning" },
        { name: "Advanced Python", level: "Currently learning" },
        { name: "Data dashboards", level: "Currently learning" }
      ]
    }
  ],
  journal: [
    {
      id: "j-1",
      title: "Building a reliable Python data-cleaning workflow",
      category: "Data Engineering",
      readingTime: "4 min read",
      date: "Jul 2026",
      summary: "Understanding how to manage messy tabular datasets, handle NaN values predictably, and enforce strict type rules with schema validation libraries."
    },
    {
      id: "j-2",
      title: "Lessons from my first web-scraping project",
      category: "Web Scraping",
      readingTime: "5 min read",
      date: "Jun 2026",
      summary: "Exploring rate limits, proper response header structures, using DOM trees in BeautifulSoup, and building robust scrapers that do not break easily."
    },
    {
      id: "j-3",
      title: "Using APIs to automate data collection",
      category: "Automation",
      readingTime: "3 min read",
      date: "May 2026",
      summary: "Setting up lightweight scheduled scripts to query RESTful APIs, process raw responses into nested arrays, and compile cleanly into standard database formats."
    },
    {
      id: "j-4",
      title: "Exploring AI assistants for data analysis",
      category: "Artificial Intelligence",
      readingTime: "6 min read",
      date: "Apr 2026",
      summary: "How to safely leverage large language models to write precise pandas query operations and construct smart, domain-aware visualization code."
    }
  ],
  explorations: [
    {
      id: "exp-1",
      title: "Python Data-Cleaning Pipeline",
      category: "Python code",
      codeSnippet: `import pandas as pd
import numpy as np

def clean_sales_data(filepath: str) -> pd.DataFrame:
    # Ingest CSV file with custom types
    df = pd.read_csv(filepath)

    # Standardize string capitalization & clean column spaces
    df.columns = df.columns.str.strip().str.lower()

    # Handle numeric columns safely and fill NaN
    if 'revenue' in df.columns:
        df['revenue'] = pd.to_numeric(df['revenue'], errors='coerce')
        df['revenue'] = df['revenue'].fillna(0.0)

    # Drop rows containing completely null identities
    df = df.dropna(subset=['customer_id'])
    return df`,
      description: "A robust structural data cleaning function. It processes inputs safely, manages invalid inputs gracefully, and validates identities."
    },
    {
      id: "exp-2",
      title: "Data Visualization Matrix",
      category: "Data visualization",
      visualizationType: "chart",
      description: "Visual exploration illustrating density curves and correlation tables for business KPIs."
    },
    {
      id: "exp-3",
      title: "Robust Scraper Core",
      category: "Web scraping",
      codeSnippet: `import requests
from bs4 import BeautifulSoup

def fetch_safe_html(url: str, headers: dict) -> str:
    try:
        response = requests.get(url, headers=headers, timeout=10)
        # Verify if request was accepted
        if response.status_code == 200:
            return response.text
        return f"Error: Received {response.status_code}"
    except requests.RequestException as e:
        return f"Connection Failed: {str(e)}""`,
      description: "Fault-tolerant page fetching module with connection timeouts and HTTP status checking."
    },
    {
      id: "exp-4",
      title: "Dashboard Layout",
      category: "Dashboard design",
      visualizationType: "chart",
      description: "A data analyst dashboard prototype focused on readability and strong visual hierarchy."
    },
    {
      id: "exp-5",
      title: "Cloud Pipeline Architecture",
      category: "Cloud architecture",
      visualizationType: "cloud",
      description: "Architecture flow depicting automated data ingest pipelines running via serverless cloud triggers."
    },
    {
      id: "exp-6",
      title: "LLM Context Window Ingestion",
      category: "AI experiments",
      codeSnippet: `def format_prompt(context: str, query: str) -> list:
    return [
        {"role": "system", "content": "You are an analytical assistant. Return ONLY valid pandas expressions."},
        {"role": "user", "content": f"Schema:\\n{context}\\n\\nFind: {query}"}
    ]`,
      description: "System message structuring to force strictly valid output formats from generative language APIs."
    }
  ],
  statistics: [
    { value: "10+", label: "Practical coding projects" },
    { value: "5+", label: "Technical areas explored" },
    { value: "2026", label: "Expected graduation" }
  ]
};
