import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import InstructorLayout from "@/components/instructor/InstructorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  courseName: string;
  rating: number;
  comment: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: "1",
    authorName: "Alice Johnson",
    authorAvatar: "https://ui-avatars.com/api/?name=Alice+Johnson&background=random",
    courseName: "JavaScript pour les débutants",
    rating: 5,
    comment: "Excellent cours, très bien expliqué et facile à comprendre.",
    date: "2024-03-15"
  },
  {
    id: "2",
    authorName: "Bob Smith",
    authorAvatar: "https://ui-avatars.com/api/?name=Bob+Smith&background=random",
    courseName: "React pour les débutants",
    rating: 4,
    comment: "Bon cours, mais pourrait être plus approfondi sur certains sujets.",
    date: "2024-03-10"
  },
  {
    id: "3",
    authorName: "Charlie Brown",
    authorAvatar: "https://ui-avatars.com/api/?name=Charlie+Brown&background=random",
    courseName: "JavaScript pour les débutants",
    rating: 5,
    comment: "Le meilleur cours que j'ai suivi jusqu'à présent. Je le recommande vivement.",
    date: "2024-03-05"
  },
  {
    id: "4",
    authorName: "Diana Miller",
    authorAvatar: "https://ui-avatars.com/api/?name=Diana+Miller&background=random",
    courseName: "React pour les débutants",
    rating: 4,
    comment: "Très utile pour comprendre les bases de React. Merci!",
    date: "2024-02-28"
  },
  {
    id: "5",
    authorName: "Ethan Davis",
    authorAvatar: "https://ui-avatars.com/api/?name=Ethan+Davis&background=random",
    courseName: "JavaScript pour les débutants",
    rating: 3,
    comment: "Le cours est correct, mais il y a quelques erreurs de grammaire.",
    date: "2024-02-20"
  }
];

// Update InstructorReviews component
const InstructorReviews = () => {
  const { isAuthenticated, hasRole } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or not an instructor
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (!hasRole("instructor")) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, hasRole, navigate]);

  if (!isAuthenticated || !hasRole("instructor")) {
    return null;
  }

  return (
    <InstructorLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-4">Avis des étudiants</h1>
        
        {mockReviews.map((review) => (
          <Card key={review.id} className="mb-4">
            <CardHeader className="flex flex-row items-center">
              <Avatar className="mr-4">
                <AvatarImage src={review.authorAvatar} alt={review.authorName} />
                <AvatarFallback>{review.authorName.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{review.authorName}</CardTitle>
                <div className="flex items-center">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-0.5" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <Star key={i + review.rating} className="h-4 w-4 text-gray-300 mr-0.5" />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Cours: {review.courseName} - {new Date(review.date).toLocaleDateString()}
              </p>
              <p>{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </InstructorLayout>
  );
};

export default InstructorReviews;
