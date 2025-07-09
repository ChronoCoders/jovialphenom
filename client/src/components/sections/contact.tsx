import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SiSpotify, SiApplemusic, SiSoundcloud, SiYoutube, SiInstagram, SiX, SiTiktok } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSubmissionSchema } from "@shared/schema";
import type { InsertContactSubmission } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const submitContactForm = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    submitContactForm.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-[var(--bg-secondary)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">Get In Touch</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to collaborate or want to book Jovial Phenom for your next event? Let's connect.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <Card className="glass-card bg-[var(--bg-card)] border-[var(--primary-purple)]/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-[var(--accent-gold)]">Streaming Platforms</h3>
                <div className="space-y-4">
                  <a href="https://open.spotify.com/artist/3rYEhqbvTUMWb6RtZkcKXl" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 hover:text-[var(--accent-gold)] transition-colors">
                    <SiSpotify size={24} />
                    <span>Spotify</span>
                  </a>
                  <a href="https://music.apple.com/ca/artist/jovial-phenom/1790666838" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 hover:text-[var(--accent-gold)] transition-colors">
                    <SiApplemusic size={24} />
                    <span>Apple Music</span>
                  </a>
                  <a href="https://soundcloud.com/jovial-phenom" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 hover:text-[var(--accent-gold)] transition-colors">
                    <SiSoundcloud size={24} />
                    <span>SoundCloud</span>
                  </a>
                  <a href="https://www.youtube.com/channel/UC8CllLIMTah6-YHJm6mJywA" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 hover:text-[var(--accent-gold)] transition-colors">
                    <SiYoutube size={24} />
                    <span>YouTube</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card bg-[var(--bg-card)] border-[var(--primary-purple)]/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-[var(--accent-gold)]">Social Media</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-gray-300">
                    <SiInstagram size={24} />
                    <span>@jovialphenom</span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-300">
                    <SiX size={24} />
                    <span>@jovialphenom</span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-300">
                    <SiTiktok size={24} />
                    <span>@jovialphenom</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card bg-[var(--bg-card)] border-[var(--accent-gold)]/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-[var(--accent-gold)]">Direct Contact</h3>
                <div className="space-y-4">
                  <a 
                    href="mailto:support@jovialphenom.com?subject=Business Inquiry - Jovial Phenom"
                    className="flex items-center space-x-4 hover:text-[var(--accent-gold)] transition-colors"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <span className="text-xl">📧</span>
                    </div>
                    <div>
                      <div className="font-medium">support@jovialphenom.com</div>
                      <div className="text-sm text-gray-400">For exclusive content, updates & direct communication</div>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card bg-[var(--bg-card)] border-[var(--primary-purple)]/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-[var(--accent-gold)]">Business Inquiries</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="contact-name">Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            id="contact-name"
                            name="name"
                            placeholder="Your Name"
                            autoComplete="name"
                            className="bg-[var(--bg-primary)] border-[var(--primary-purple)] focus:border-[var(--accent-gold)]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="contact-email">Email</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            id="contact-email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            className="bg-[var(--bg-primary)] border-[var(--primary-purple)] focus:border-[var(--accent-gold)]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="contact-subject">Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger 
                              id="contact-subject"
                              name="subject"
                              className="bg-[var(--bg-primary)] border-[var(--primary-purple)] focus:border-[var(--accent-gold)]"
                            >
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Booking Inquiry">Booking Inquiry</SelectItem>
                            <SelectItem value="Collaboration">Collaboration</SelectItem>
                            <SelectItem value="Press/Media">Press/Media</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="contact-message">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            id="contact-message"
                            name="message"
                            rows={4}
                            placeholder="Your message..."
                            autoComplete="off"
                            className="bg-[var(--bg-primary)] border-[var(--primary-purple)] focus:border-[var(--accent-gold)]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-dark)] text-black font-semibold"
                    disabled={submitContactForm.isPending}
                  >
                    {submitContactForm.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
