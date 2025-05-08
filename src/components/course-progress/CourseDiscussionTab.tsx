
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { Star, MessageSquare } from "lucide-react";

interface CourseDiscussionTabProps {
  courseId: string;
  reviews: any[];
}

const CourseDiscussionTab = ({ courseId, reviews }: CourseDiscussionTabProps) => {
  const { currentUser } = useAuth();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Mock submit for now - will be replaced with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setComment('');
    setRating(5);
    setSubmitting(false);
    
    // Show success toast (would be handled through a real API call)
    alert('Avis ajouté avec succès!');
  };
  
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold flex items-center">
        <MessageSquare className="mr-2 h-5 w-5" />
        Discussion et avis sur le cours
      </h2>
      
      {/* Add review form */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Ajouter un avis</h3>
        
        <form onSubmit={handleSubmitReview}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Note</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  type="button"
                  className="focus:outline-none"
                  onClick={() => setRating(star)}
                >
                  <Star 
                    className={`h-6 w-6 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              Commentaire
            </label>
            <Textarea
              id="comment"
              placeholder="Partagez votre expérience avec ce cours..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-32"
            />
          </div>
          
          <Button type="submit" disabled={submitting}>
            {submitting ? "Envoi en cours..." : "Envoyer mon avis"}
          </Button>
        </form>
      </div>
      
      {/* Reviews list */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">
          Avis et commentaires ({reviews.length})
        </h3>
        
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div 
              key={review.id} 
              className="border rounded-lg p-6"
            >
              <div className="flex items-start">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.reviewer_avatar} />
                  <AvatarFallback>{review.reviewer_name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="ml-4 flex-grow">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{review.reviewer_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex my-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating 
                          ? 'text-amber-400 fill-amber-400' 
                          : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <p className="mt-2">{review.comment}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-muted/30 rounded-lg">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium mb-2">Aucun avis pour le moment</h4>
            <p className="text-muted-foreground">
              Soyez le premier à donner votre avis sur ce cours !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDiscussionTab;
