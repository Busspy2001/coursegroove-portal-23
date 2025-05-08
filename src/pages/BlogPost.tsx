
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Clock, User, Share2, BookmarkPlus, 
  ThumbsUp, MessageSquare, Facebook, Twitter, Linkedin, Link, 
  ArrowLeft, ChevronRight, BookOpen 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { blogPosts } from "@/data/blogData";
import { Separator } from "@/components/ui/separator";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Find the current post by slug
  const post = blogPosts.find(post => post.slug === slug);
  
  // If post doesn't exist, navigate to 404
  if (!post) {
    navigate("/404");
    return null;
  }
  
  // Find related posts (same category)
  const relatedPosts = blogPosts
    .filter(p => p.slug !== slug && p.categories.some(cat => post.categories.includes(cat)))
    .slice(0, 3);
  
  // Current post index and navigation
  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="container px-6 mx-auto py-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Button 
              variant="ghost" 
              className="p-0 h-auto hover:bg-transparent hover:text-schoolier-blue"
              onClick={() => navigate("/")}
            >
              Accueil
            </Button>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Button 
              variant="ghost" 
              className="p-0 h-auto hover:bg-transparent hover:text-schoolier-blue"
              onClick={() => navigate("/blog")}
            >
              Blog
            </Button>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground">{post.title}</span>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="w-full bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 py-8">
          <div className="container px-6 mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-xl overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Article Content */}
        <div className="container px-6 mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2 mb-4">
              {post.categories.map((cat, idx) => (
                <Badge key={idx} className="bg-schoolier-teal/10 text-schoolier-teal hover:bg-schoolier-teal/20">
                  {cat}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${post.author}&background=0D9488&color=fff`} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" /> 
                  <span className="text-sm">{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" /> 
                  <span className="text-sm">{post.readTime} min</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <BookmarkPlus className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Sauvegarder</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Partager</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            {/* Article Content */}
            <div className="prose dark:prose-invert max-w-none prose-headings:text-schoolier-blue prose-a:text-schoolier-teal prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg mb-12">
              <p className="lead">{post.excerpt}</p>
              
              <h2>Introduction</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.
              </p>
              
              <p>
                Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue.
              </p>
              
              <h2>Pourquoi c'est important</h2>
              <p>
                Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.
              </p>
              
              <blockquote>
                L'apprentissage est un trésor qui suivra son propriétaire partout. — Proverbe chinois
              </blockquote>
              
              <h2>Comment mettre en pratique</h2>
              <p>
                Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar.
              </p>
              
              <ul>
                <li>Pratiquer régulièrement</li>
                <li>Fixer des objectifs clairs</li>
                <li>Demander des retours constructifs</li>
                <li>S'inspirer des meilleurs</li>
                <li>Rester cohérent et persévérant</li>
              </ul>
              
              <h2>Conclusion</h2>
              <p>
                Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam.
              </p>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["apprentissage", "éducation", "conseil", "développement personnel"].map((tag, idx) => (
                <Badge key={idx} variant="outline" className="hover:bg-muted">
                  {tag}
                </Badge>
              ))}
            </div>
            
            {/* Share Section */}
            <div className="border rounded-lg p-6 mb-12 bg-gray-50 dark:bg-gray-800">
              <h3 className="font-semibold mb-4">Partager cet article</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Link className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Author Section */}
            <div className="border rounded-lg p-6 mb-12">
              <div className="flex flex-col sm:flex-row gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${post.author}&background=0D9488&color=fff&size=128`} alt={post.author} />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{post.author}</h3>
                  <p className="text-muted-foreground mb-4">
                    Expert en éducation et apprentissage en ligne avec plus de 10 ans d'expérience dans la formation professionnelle. Passionné par les méthodes d'apprentissage innovantes et le développement des compétences.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Voir le profil
                    </Button>
                    <Button variant="ghost" size="sm" className="text-schoolier-blue">
                      Tous ses articles
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Post Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              {prevPost ? (
                <Button 
                  variant="outline" 
                  className="flex-1 justify-start"
                  onClick={() => navigate(`/blog/${prevPost.slug}`)}
                >
                  <div className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground">Article précédent</div>
                      <div className="text-sm truncate max-w-[200px]">{prevPost.title}</div>
                    </div>
                  </div>
                </Button>
              ) : (
                <div className="flex-1"></div>
              )}
              
              {nextPost ? (
                <Button 
                  variant="outline" 
                  className="flex-1 justify-end"
                  onClick={() => navigate(`/blog/${nextPost.slug}`)}
                >
                  <div className="flex items-center">
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Article suivant</div>
                      <div className="text-sm truncate max-w-[200px]">{nextPost.title}</div>
                    </div>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </div>
                </Button>
              ) : (
                <div className="flex-1"></div>
              )}
            </div>
            
            {/* Comments Section - Placeholder */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Commentaires (5)</h3>
              <div className="space-y-6">
                {[1, 2, 3].map((_, idx) => (
                  <div key={idx} className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://ui-avatars.com/api/?name=User+${idx+1}&background=2563EB&color=fff`} />
                      <AvatarFallback>U{idx+1}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h4 className="font-medium">Utilisateur {idx+1}</h4>
                          <p className="text-xs text-muted-foreground">Il y a {idx+1} jours</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-auto p-1">
                          <ThumbsUp className="h-4 w-4 mr-1" /> {(idx+1) * 3}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Excellente ressource ! Ces conseils m'ont beaucoup aidé dans mon parcours d'apprentissage. J'apprécie particulièrement les exemples concrets et la méthodologie proposée.
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  Afficher plus de commentaires
                </Button>
              </div>
            </div>
            
            {/* Add Comment - Placeholder */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Laisser un commentaire</h3>
              <textarea 
                className="w-full p-4 rounded-lg border min-h-[100px] mb-4"
                placeholder="Partagez votre avis ou posez une question..."
              ></textarea>
              <Button className="bg-schoolier-blue hover:bg-schoolier-blue/90">
                <MessageSquare className="mr-2 h-4 w-4" /> Publier le commentaire
              </Button>
            </div>
          </div>
        </div>
        
        {/* Related Articles */}
        <div className="bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container px-6 mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Articles similaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, idx) => (
                  <Card key={idx} className="overflow-hidden card-hover">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex gap-1 mb-2">
                        <Badge variant="secondary" className="text-xs bg-schoolier-teal/10 text-schoolier-teal">
                          {relatedPost.categories[0]}
                        </Badge>
                      </div>
                      <h3 
                        className="font-semibold mb-2 hover:text-schoolier-blue cursor-pointer line-clamp-2"
                        onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                      >
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" /> {relatedPost.date}
                        <span className="mx-1">•</span>
                        <Clock className="h-3 w-3 mr-1" /> {relatedPost.readTime} min
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
