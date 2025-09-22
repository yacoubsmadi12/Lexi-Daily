import { ContactForm } from "@/components/app/contact-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gem } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About Lexi Daily</h1>
        <p className="mt-2 text-lg text-muted-foreground">Your daily dose of English vocabulary.</p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                Our Mission <Gem className="h-5 w-5 text-primary" />
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>
            Welcome to Lexi Daily! Our mission is to make learning English vocabulary an enjoyable and rewarding daily habit. We believe that consistent, small steps lead to significant progress. Every day, we introduce one powerful English word, complete with its definition, pronunciation, usage examples, and a fun mini-quiz to reinforce your learning.
            </p>
            <p>
            This platform is powered by Google's Gemini AI to ensure the highest quality content, from word selection to example sentences and daily tips. We are passionate about language and technology, and we've combined them to create a simple, clean, and effective learning experience.
            </p>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>Have a suggestion or feedback? We'd love to hear from you!</CardDescription>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  );
}
