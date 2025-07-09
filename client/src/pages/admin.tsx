import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Settings, Users, Mail, MessageSquare, Music, Image, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ContactSubmission, Newsletter, Track, PressArticle, GalleryImage } from "@shared/schema";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: contactSubmissions } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contact-submissions"],
  });

  const { data: newsletterSubscribers } = useQuery<Newsletter[]>({
    queryKey: ["/api/admin/newsletter-subscribers"],
  });

  const { data: tracks } = useQuery<Track[]>({
    queryKey: ["/api/tracks"],
  });

  const { data: pressArticles } = useQuery<PressArticle[]>({
    queryKey: ["/api/press"],
  });

  const { data: galleryImages } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const stats = {
    totalTracks: tracks?.length || 0,
    featuredTracks: tracks?.filter(t => t.featured)?.length || 0,
    totalSubscribers: newsletterSubscribers?.length || 0,
    pendingMessages: contactSubmissions?.length || 0,
    pressArticles: pressArticles?.length || 0,
    galleryImages: galleryImages?.length || 0,
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <Settings className="text-[var(--accent-gold)] mr-4" size={32} />
          <div>
            <h1 className="text-4xl font-bold gradient-text">Admin Panel</h1>
            <p className="text-gray-300">Manage your Jovial Phenom portfolio</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[var(--bg-secondary)] border-[var(--primary-purple)]/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[var(--accent-gold)] data-[state=active]:text-black">
              Overview
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-[var(--accent-gold)] data-[state=active]:text-black">
              Content
            </TabsTrigger>
            <TabsTrigger value="engagement" className="data-[state=active]:bg-[var(--accent-gold)] data-[state=active]:text-black">
              Fan Engagement
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-[var(--accent-gold)] data-[state=active]:text-black">
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="glass-card bg-[var(--bg-card)] border-[var(--primary-purple)]/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Tracks</p>
                      <p className="text-3xl font-bold text-[var(--accent-gold)]">{stats.totalTracks}</p>
                    </div>
                    <Music className="text-[var(--primary-purple)]" size={24} />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{stats.featuredTracks} featured</p>
                </CardContent>
              </Card>

              <Card className="glass-card bg-[var(--bg-card)] border-[var(--primary-purple)]/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Newsletter Subscribers</p>
                      <p className="text-3xl font-bold text-[var(--accent-gold)]">{stats.totalSubscribers}</p>
                    </div>
                    <Users className="text-[var(--primary-purple)]" size={24} />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Active subscribers</p>
                </CardContent>
              </Card>

              <Card className="glass-card bg-[var(--bg-card)] border-[var(--primary-purple)]/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Pending Messages</p>
                      <p className="text-3xl font-bold text-[var(--accent-gold)]">{stats.pendingMessages}</p>
                    </div>
                    <MessageSquare className="text-[var(--primary-purple)]" size={24} />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Needs response</p>
                </CardContent>
              </Card>

              <Card className="glass-card bg-[var(--bg-card)] border-[var(--primary-purple)]/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Press Articles</p>
                      <p className="text-3xl font-bold text-[var(--accent-gold)]">{stats.pressArticles}</p>
                    </div>
                    <FileText className="text-[var(--primary-purple)]" size={24} />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Published reviews</p>
                </CardContent>
              </Card>

              <Card className="glass-card bg-[var(--bg-card)] border-[var(--primary-purple)]/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Gallery Images</p>
                      <p className="text-3xl font-bold text-[var(--accent-gold)]">{stats.galleryImages}</p>
                    </div>
                    <Image className="text-[var(--primary-purple)]" size={24} />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Total photos</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass-card bg-[var(--bg-card)] border-[var(--primary-purple)]/20">
                <CardHeader>
                  <CardTitle className="text-[var(--accent-gold)]">Tracks Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tracks?.slice(0, 5).map((track) => (
                    <div key={track.id} className="flex items-center justify-between p-3 bg-[var(--bg-primary)] rounded-lg">
                      <div>
                        <p className="font-semibold">{track.title}</p>
                        <p className="text-sm text-gray-400">{track.albumType} • {track.releaseYear}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {track.featured && <Badge className="bg-[var(--accent-gold)] text-black">Featured</Badge>}
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-dark)] text-black">
                    Add New Track
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card bg-[var(--bg-card)] border-[var(--primary-purple)]/20">
                <CardHeader>
                  <CardTitle className="text-[var(--accent-gold)]">Press Coverage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pressArticles?.slice(0, 5).map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-3 bg-[var(--bg-primary)] rounded-lg">
                      <div>
                        <p className="font-semibold">{article.publication}</p>
                        <p className="text-sm text-gray-400">{article.title}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex text-[var(--accent-gold)]">
                          {Array.from({ length: article.rating }, (_, i) => "⭐").join("")}
                        </div>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-dark)] text-black">
                    Add Press Article
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <Card className="glass-card bg-[var(--bg-card)] border-[var(--primary-purple)]/20">
              <CardHeader>
                <CardTitle className="text-[var(--accent-gold)]">Newsletter Subscribers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {newsletterSubscribers?.map((subscriber) => (
                    <div key={subscriber.id} className="flex items-center justify-between p-3 bg-[var(--bg-primary)] rounded-lg">
                      <div>
                        <p className="font-semibold">{subscriber.name || "Anonymous"}</p>
                        <p className="text-sm text-gray-400">{subscriber.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={subscriber.isActive ? "default" : "secondary"}>
                          {subscriber.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(subscriber.subscribedAt || '').toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  {(!newsletterSubscribers || newsletterSubscribers.length === 0) && (
                    <p className="text-center text-gray-400 py-8">No subscribers yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card className="glass-card bg-[var(--bg-card)] border-[var(--primary-purple)]/20">
              <CardHeader>
                <CardTitle className="text-[var(--accent-gold)]">Contact Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {contactSubmissions?.map((submission) => (
                    <div key={submission.id} className="p-4 bg-[var(--bg-primary)] rounded-lg border border-[var(--primary-purple)]/20">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold">{submission.name}</p>
                          <p className="text-sm text-gray-400">{submission.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-[var(--primary-purple)]">{submission.subject}</Badge>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(submission.submittedAt || '').toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">{submission.message}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-dark)] text-black">
                          Reply
                        </Button>
                        <Button size="sm" variant="outline">Mark as Read</Button>
                      </div>
                    </div>
                  ))}
                  {(!contactSubmissions || contactSubmissions.length === 0) && (
                    <p className="text-center text-gray-400 py-8">No messages yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}