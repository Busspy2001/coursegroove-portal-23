
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Clock, User, Tag, ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { blogPosts } from "@/data/blogData";

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Filter blog posts based on search query and category
  const getFilteredPosts = () => {
    let filtered = [...blogPosts];
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (categoryFilter !== "all") {
      filtered = filtered.filter(post => 
        post.categories.includes(categoryFilter)
      );
    }
    
    return filtered;
  };
  
  const filteredPosts = getFilteredPosts();
  
  // Get unique categories from all posts
  const allCategories = [...new Set(blogPosts.flatMap(post => post.categories))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 py-20">
        <div className="container px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-schoolier-teal/20 text-schoolier-teal border-none px-3 py-1.5 text-sm font-medium mb-4">
              Blog éducatif
            </Badge>
            <h1 className="heading-1 text-schoolier-blue mb-6">Ressources et conseils pour votre apprentissage</h1>
            <p className="subheading mb-8">
              Découvrez nos articles, guides et conseils pour optimiser votre parcours d'apprentissage et développer vos compétences
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un article..."
                className="pl-10 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 container px-6 mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="sticky top-8 space-y-8">
              {/* Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Catégories</h3>
                <div className="space-y-2">
                  <div 
                    className={`cursor-pointer px-3 py-2 rounded-md ${categoryFilter === "all" ? "bg-schoolier-blue/10 text-schoolier-blue" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                    onClick={() => setCategoryFilter("all")}
                  >
                    Toutes les catégories
                  </div>
                  {allCategories.map((category, index) => (
                    <div 
                      key={index}
                      className={`cursor-pointer px-3 py-2 rounded-md ${categoryFilter === category ? "bg-schoolier-blue/10 text-schoolier-blue" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                      onClick={() => setCategoryFilter(category)}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Popular Posts */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Articles populaires</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 
                          className="font-medium text-sm hover:text-schoolier-blue cursor-pointer"
                          onClick={() => navigate(`/blog/${post.slug}`)}
                        >
                          {post.title}
                        </h4>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" /> {post.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="bg-gradient-to-r from-schoolier-blue/20 to-schoolier-teal/20 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-2">Restez informé</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Abonnez-vous à notre newsletter pour recevoir nos derniers articles et conseils
                </p>
                <Input
                  type="email"
                  placeholder="Votre email"
                  className="mb-3"
                />
                <Button className="w-full bg-schoolier-blue hover:bg-schoolier-blue/90">
                  S'abonner
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h2 className="text-2xl font-bold">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                {categoryFilter !== "all" ? ` dans "${categoryFilter}"` : ''}
                {searchQuery ? ` pour "${searchQuery}"` : ''}
              </h2>
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Plus récents</SelectItem>
                  <SelectItem value="popular">Plus populaires</SelectItem>
                  <SelectItem value="trending">En tendance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Featured Post */}
            {filteredPosts.length > 0 && !searchQuery && categoryFilter === "all" && (
              <div className="mb-8">
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src={filteredPosts[0].image} 
                    alt={filteredPosts[0].title} 
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                    <div className="flex gap-2 mb-2">
                      {filteredPosts[0].categories.map((cat, idx) => (
                        <Badge key={idx} variant="outline" className="text-white border-white hover:bg-white/20">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{filteredPosts[0].title}</h3>
                    <p className="text-white/80 mb-4">{filteredPosts[0].excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" /> 
                          <span className="text-sm">{filteredPosts[0].author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" /> 
                          <span className="text-sm">{filteredPosts[0].date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" /> 
                          <span className="text-sm">{filteredPosts[0].readTime} min</span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="border-white text-white hover:bg-white/20"
                        onClick={() => navigate(`/blog/${filteredPosts[0].slug}`)}
                      >
                        Lire l'article
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Post Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {(searchQuery || categoryFilter !== "all" ? filteredPosts : filteredPosts.slice(1)).map((post, index) => (
                  <Card key={index} className="overflow-hidden card-hover border">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex gap-2 mb-3">
                        {post.categories.map((cat, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-schoolier-teal/10 text-schoolier-teal hover:bg-schoolier-teal/20">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                      <h3 
                        className="text-xl font-semibold mb-2 cursor-pointer hover:text-schoolier-blue"
                        onClick={() => navigate(`/blog/${post.slug}`)}
                      >
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" /> {post.date}
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-1" /> {post.readTime} min
                        </div>
                        <Button 
                          variant="ghost" 
                          className="p-0 hover:bg-transparent text-schoolier-blue hover:text-schoolier-blue/80"
                          onClick={() => navigate(`/blog/${post.slug}`)}
                        >
                          Lire <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucun article trouvé</h3>
                <p className="text-muted-foreground mb-6">
                  Nous n'avons pas trouvé d'articles correspondant à vos critères. Essayez une autre recherche.
                </p>
                <div className="flex justify-center gap-4">
                  <Button onClick={() => setSearchQuery("")} variant="outline">Réinitialiser la recherche</Button>
                  <Button onClick={() => setCategoryFilter("all")} className="bg-schoolier-blue hover:bg-schoolier-blue/90">
                    Voir tous les articles
                  </Button>
                </div>
              </div>
            )}
            
            {/* Pagination */}
            {filteredPosts.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <Button variant="outline" disabled>Précédent</Button>
                  <Button variant="outline" className="bg-schoolier-blue/10 text-schoolier-blue">1</Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline">Suivant</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-6 mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-3 mb-4">Prêt à développer vos compétences ?</h2>
              <p className="subheading mb-8">
                Explorez notre catalogue de cours et commencez votre parcours d'apprentissage dès aujourd'hui
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate("/courses")} 
                className="bg-schoolier-blue hover:bg-schoolier-blue/90"
              >
                Découvrir les cours
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
