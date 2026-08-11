export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  featured: boolean;
  size: 'large' | 'small';
  metric?: string;
  insights?: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  dates: string;
  bullets: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  dates: string;
  gpa: string;
  modules: string[];
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    firstName: string;
    lastName: string;
    initials: string;
    title: string;
    location: string;
    graduation?: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    resume: string;
    availability: string;
    note: string;
  };
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skillsData: SkillGroup[];
  certifications: string[];
  languages: string[];
  statistics: { value: string; label: string }[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Vishva Gandhi",
    firstName: "Vishva",
    lastName: "Gandhi",
    initials: "VG",
    title: "M.Sc. Software Engineering & Management · Data Analyst & BI Developer",
    location: "Heilbronn, Germany",
    email: "vishvagandhi027@gmail.com",
    phone: "+49 15563 612 921",
    github: "https://github.com/Vicky-HHN",
    linkedin: "https://linkedin.com/in/vishva-gandhi",
    resume: "#",
    availability: "Open to internships and working-student opportunities",
    note: "Work-authorised in Germany"
  },
  experience: [
    {
      title: "Data Analyst & BI Developer",
      company: "Oscar IT Solutions",
      location: "India",
      dates: "Jan 2024 – Feb 2025",
      bullets: [
        "Built and maintained 4 real-time Power BI dashboards, designing data models, DAX-based KPI logic, and Power Query transformations for cross-functional business reporting.",
        "Designed and automated ETL pipelines in Python and SQL processing 500K+ records from multiple source systems, reducing reporting cycles by 40% and establishing robust data engineering workflows.",
        "Evaluated 3 AI/LLM solutions (GPT-4 and open-source models) using a structured, criteria-based methodology, delivering a technical decision framework and recommendations to the engineering team.",
        "Worked with relational databases (PostgreSQL) and REST APIs to integrate and structure data across systems, ensuring reliable, consistent data pipelines.",
        "Gathered requirements from cross-functional stakeholders, translated data into clear insights, and documented data models and processes for long-term maintainability."
      ]
    }
  ],
  education: [
    {
      degree: "M.Sc. Software Engineering & Management",
      school: "Hochschule Heilbronn",
      location: "Germany",
      dates: "Mar 2025 – Present",
      gpa: "GPA: 1.9 / 4.0",
      modules: ["Data Science Lab", "Cloud Computing", "Advanced Software Architecture", "DevOps and SecOps", "Deep Learning"]
    },
    {
      degree: "B.Tech. Information Technology",
      school: "A.D. Patel Institute of Technology",
      location: "India",
      dates: "Jul 2020 – Jan 2024",
      gpa: "GPA: 1.8 (German scale)",
      modules: ["Python Programming", "Database Systems", "Statistics & Data Analysis", "Algorithms"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Strategic Sales Performance Dashboard",
      tagline: "Power BI · PostgreSQL · ETL · KPI reporting",
      description: "Designed a scalable data model (star schema, PostgreSQL) and an automated ETL pipeline aggregating 9,000+ transaction records from multiple sources as the foundation for the reporting layer. Built 6+ interactive Power BI dashboards with DAX-based KPI logic and Power Query transformations, enabling 3x faster analysis for business stakeholders.",
      longDescription: "Designed a scalable data model (star schema, PostgreSQL) and an automated ETL pipeline aggregating 9,000+ transaction records from multiple sources as the foundation for the reporting layer. Built 6+ interactive Power BI dashboards with DAX-based KPI logic and Power Query transformations, enabling 3x faster analysis for business stakeholders.",
      technologies: ["Power BI", "PostgreSQL", "ETL", "KPI reporting", "DAX", "Power Query"],
      githubUrl: "https://github.com/Vicky-HHN",
      featured: true,
      size: "large",
      metric: "3x faster analysis",
      insights: ["Star schema layout", "DAX metrics formulation", "Power Query cleansing"]
    },
    {
      id: "proj-2",
      title: "AI-Powered Web Scraper & Analytics Pipeline",
      tagline: "Python · Playwright · AI embeddings · Streamlit · REST APIs",
      description: "Built an end-to-end data pipeline in Python using Playwright for web scraping, with AI embedding-based quality gates for schema-agnostic ingestion into PostgreSQL at scale – a full extract-transform-load workflow with automated validation. Delivered a live Streamlit BI dashboard with 5+ KPI modules exposed via REST API for real-time, cross-functional analytics reporting.",
      longDescription: "Built an end-to-end data pipeline in Python using Playwright for web scraping, with AI embedding-based quality gates for schema-agnostic ingestion into PostgreSQL at scale – a full extract-transform-load workflow with automated validation. Delivered a live Streamlit BI dashboard with 5+ KPI modules exposed via REST API for real-time, cross-functional analytics reporting.",
      technologies: ["Python", "Playwright", "AI embeddings", "Streamlit", "REST APIs", "PostgreSQL"],
      githubUrl: "https://github.com/Vicky-HHN",
      featured: true,
      size: "small",
      metric: "5+ KPI modules",
      insights: ["Playwright scraping", "AI Quality Gates", "Streamlit deployment"]
    },
    {
      id: "proj-3",
      title: "AI Video Upscaling — Windows Desktop Application",
      tagline: "Deep learning · ESRGAN · SwinIR · CI/CD · PyInstaller",
      description: "Engineered a deep learning inference pipeline using ESRGAN, SwinIR, and neural network architectures, benchmarking and evaluating 5 models with a systematic PSNR/SSIM-based framework. Packaged the complete application via PyInstaller and integrated an automated CI/CD pipeline, reducing manual processing time by 80% through full process automation.",
      longDescription: "Engineered a deep learning inference pipeline using ESRGAN, SwinIR, and neural network architectures, benchmarking and evaluating 5 models with a systematic PSNR/SSIM-based framework. Packaged the complete application via PyInstaller and integrated an automated CI/CD pipeline, reducing manual processing time by 80% through full process automation.",
      technologies: ["Deep learning", "ESRGAN", "SwinIR", "CI/CD", "PyInstaller", "Python"],
      githubUrl: "https://github.com/Vicky-HHN",
      featured: true,
      size: "small",
      metric: "80% reduction in manual time",
      insights: ["ESRGAN model benchmark", "PyInstaller application packager", "Automated CI/CD pipeline"]
    }
  ],
  skillsData: [
    {
      category: "Data Analysis & BI",
      skills: ["Power BI (Dashboards, Data Modelling, DAX, Power Query)", "Excel (advanced)", "Streamlit", "Matplotlib", "KPI development"]
    },
    {
      category: "Data Engineering & ETL",
      skills: ["Python (Pandas, NumPy)", "SQL", "ETL/ELT pipelines", "PostgreSQL", "MongoDB", "Data modelling", "Large-scale data processing"]
    },
    {
      category: "Cloud & Platforms",
      skills: ["AWS (Lambda, S3)", "Databricks", "Git", "CI/CD", "REST APIs", "Microsoft Fabric (keen to develop)"]
    },
    {
      category: "Microsoft 365 & Automation",
      skills: ["Excel", "PowerPoint", "SharePoint (familiar)", "Power Automate (keen to develop)", "Power Apps (keen to develop)", "Microsoft Copilot (keen to develop)"]
    },
    {
      category: "AI & Machine Learning",
      skills: ["LLMs", "AI/LLM evaluation", "Prompt engineering", "AI embeddings", "Deep learning", "Scikit-learn", "Neural networks"]
    },
    {
      category: "Methodologies",
      skills: ["Stakeholder communication", "Requirements gathering", "Documentation", "Agile", "Cross-functional collaboration"]
    }
  ],
  certifications: [
    "SAP Certified: Discover SAP BTP & Start with UX — SAP Emerging Technologies",
    "Data Science Fundamentals for Data Analysts — Databricks / Coursera",
    "Machine Learning with Python — IBM / Coursera",
    "Introduction to Deep Learning & Neural Networks with Keras — IBM / Coursera",
    "Introduction to Cloud Computing — IBM / Coursera"
  ],
  languages: [
    "English — C1 Professional",
    "German — B1 (actively advancing)"
  ],
  statistics: [
    { value: "1+ Years", label: "Professional experience" },
    { value: "4+", label: "Power BI dashboards" },
    { value: "500K+", label: "ETL records processed" }
  ]
};
