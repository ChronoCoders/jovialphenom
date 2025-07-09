import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertNewsletterSchema } from "@shared/schema";
import type { InsertNewsletter } from "@shared/schema";

export default function NewsletterSignup() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertNewsletter>({
    resolver: zodResolver(insertNewsletterSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const subscribeToNewsletter = useMutation({
    mutationFn: async (data: InsertNewsletter) => {
      await apiRequest("POST", "/api/newsletter/subscribe", data);
    },
    onSuccess: () => {
      setIsSubscribed(true);
      toast({
        title: "Welcome to the family!",
        description: "You'll receive exclusive content and updates from Jovial Phenom.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertNewsletter) => {
    subscribeToNewsletter.mutate(data);
  };

  if (isSubscribed) {
    return (
      <Card className="glass-card bg-[var(--bg-card)] border-[var(--accent-gold)]/30">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-[var(--accent-gold)] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-[var(--accent-gold)] mb-2">You're In!</h3>
          <p className="text-gray-300">
            Welcome to the Jovial Phenom family. Get ready for exclusive content, 
            behind-the-scenes access, and early releases.
          </p>
          <p className="mt-4 text-sm text-[var(--accent-gold)]">
            For special requests or direct communication:{" "}
            <a 
              href="mailto:support@jovialphenom.com?subject=Inner Circle Member - Special Request"
              className="hover:underline font-medium"
            >
              support@jovialphenom.com
            </a>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card bg-[var(--bg-card)] border-[var(--primary-purple)]/20 hover-glow transition-all">
      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-[var(--accent-gold)] rounded-full flex items-center justify-center mr-4">
            <Mail className="text-black" size={20} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[var(--accent-gold)]">Join the Inner Circle</h3>
            <p className="text-gray-300">Get exclusive content and early access to new releases</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="newsletter-name">Name (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      id="newsletter-name"
                      name="name"
                      value={field.value || ""}
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
                  <FormLabel htmlFor="newsletter-email">Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      id="newsletter-email"
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
            <Button 
              type="submit" 
              className="w-full bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-dark)] text-black font-semibold"
              disabled={subscribeToNewsletter.isPending}
            >
              {subscribeToNewsletter.isPending ? "Subscribing..." : "Join the Family"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-sm text-gray-400 text-center">
          <p>✨ Exclusive tracks • 🎬 Behind-the-scenes content • 🎵 Early releases</p>
          <p className="mt-2">No spam, unsubscribe anytime.</p>
          <p className="mt-3 text-[var(--accent-gold)]">
            For exclusive content requests or direct communication:{" "}
            <a 
              href="mailto:support@jovialphenom.com?subject=Inner Circle - Exclusive Content Request"
              className="hover:underline font-medium"
            >
              support@jovialphenom.com
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}