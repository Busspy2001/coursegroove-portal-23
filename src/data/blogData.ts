
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  readTime: number;
  image: string;
  categories: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Comment apprendre efficacement une nouvelle compétence technique",
    slug: "apprendre-efficacement-competence-technique",
    excerpt: "Découvrez les méthodes prouvées pour maîtriser rapidement de nouvelles compétences techniques, même avec un emploi du temps chargé.",
    author: "Sophie Martin",
    date: "12 mai 2025",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    categories: ["Apprentissage", "Productivité"]
  },
  {
    id: 2,
    title: "Les tendances du développement web en 2025",
    slug: "tendances-developpement-web-2025",
    excerpt: "Voici les technologies et frameworks qui domineront le développement web cette année, et pourquoi vous devriez les apprendre.",
    author: "Thomas Dubois",
    date: "3 mai 2025",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    categories: ["Développement Web", "Technologie"]
  },
  {
    id: 3,
    title: "5 compétences essentielles pour réussir en marketing digital",
    slug: "competences-essentielles-marketing-digital",
    excerpt: "Le marketing digital évolue constamment. Découvrez les compétences que tout professionnel doit maîtriser pour rester compétitif.",
    author: "Léa Moreau",
    date: "28 avril 2025",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    categories: ["Marketing Digital", "Carrière"]
  },
  {
    id: 4,
    title: "Guide complet du freelancing pour débutants",
    slug: "guide-complet-freelancing-debutants",
    excerpt: "Tout ce que vous devez savoir pour démarrer votre carrière de freelance : trouver des clients, gérer vos finances et développer votre réputation.",
    author: "Marc Petit",
    date: "20 avril 2025",
    readTime: 12,
    image: "https://images.unsplash.com/photo-1487611459768-bd414656ea10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    categories: ["Freelancing", "Entrepreneuriat"]
  },
  {
    id: 5,
    title: "Les bases de l'intelligence artificielle expliquées simplement",
    slug: "bases-intelligence-artificielle-expliquees-simplement",
    excerpt: "Démystifiez l'IA avec cette introduction accessible qui vous explique les concepts fondamentaux sans jargon technique complexe.",
    author: "Sophie Martin",
    date: "15 avril 2025",
    readTime: 9,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    categories: ["Intelligence Artificielle", "Technologie"]
  },
  {
    id: 6,
    title: "Comment créer un portfolio en ligne qui attire l'attention des recruteurs",
    slug: "creer-portfolio-en-ligne-attire-recruteurs",
    excerpt: "Les éléments essentiels d'un portfolio professionnel qui se démarque et augmente vos chances de décrocher votre emploi de rêve.",
    author: "Thomas Dubois",
    date: "10 avril 2025",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    categories: ["Carrière", "Design"]
  },
  {
    id: 7,
    title: "Les meilleures ressources gratuites pour apprendre le design UX/UI",
    slug: "meilleures-ressources-gratuites-design-uxui",
    excerpt: "Une sélection de cours, tutoriels et outils gratuits pour commencer ou perfectionner vos compétences en design d'interface utilisateur.",
    author: "Léa Moreau",
    date: "5 avril 2025",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    categories: ["Design", "UX/UI"]
  },
  {
    id: 8,
    title: "Comment se préparer à une certification technique",
    slug: "se-preparer-certification-technique",
    excerpt: "Stratégies éprouvées et conseils pratiques pour réussir vos examens de certification dans les domaines techniques.",
    author: "Marc Petit",
    date: "28 mars 2025",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    categories: ["Apprentissage", "Certifications"]
  }
];
