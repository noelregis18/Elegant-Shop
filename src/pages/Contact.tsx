
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    form.reset();
  };
  
  const contactLinks = [
    { 
      name: "LinkedIn", 
      icon: <Linkedin className="h-5 w-5" />, 
      url: "https://www.linkedin.com/in/noel-regis-aa07081b1/",
      label: "Connect on LinkedIn"
    },
    { 
      name: "GitHub", 
      icon: <Github className="h-5 w-5" />, 
      url: "https://github.com/noelregis18",
      label: "Follow on GitHub" 
    },
    { 
      name: "Twitter", 
      icon: <Twitter className="h-5 w-5" />, 
      url: "https://x.com/NoelRegis8",
      label: "Follow on Twitter" 
    },
    { 
      name: "Email", 
      icon: <Mail className="h-5 w-5" />, 
      url: "mailto:noel.regis04@gmail.com",
      label: "noel.regis04@gmail.com" 
    },
    { 
      name: "Phone", 
      icon: <Phone className="h-5 w-5" />, 
      url: "tel:+917319546900",
      label: "+91 7319546900" 
    },
    { 
      name: "Location", 
      icon: <MapPin className="h-5 w-5" />, 
      url: "https://www.google.com/maps/place/Asansol,+West+Bengal,+India",
      label: "Asansol, West Bengal, India" 
    },
  ];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your email address" {...field} />
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
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Subject of your message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="How can we help you?" 
                        className="resize-none" 
                        rows={6} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Send Message
              </Button>
            </form>
          </Form>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-6">Reach Out to Me</h2>
          
          <div className="grid gap-6">
            {contactLinks.map((link) => (
              <a 
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="bg-purple-100 p-3 rounded-full text-purple-600 mr-4">
                  {link.icon}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{link.name}</div>
                  <div className="text-gray-500 text-sm">{link.label}</div>
                </div>
              </a>
            ))}
            
            <a 
              href="http://topmate.io/noel_regis"
              target="_blank" 
              rel="noreferrer"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="bg-purple-100 p-3 rounded-full text-purple-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-gray-900">Topmate</div>
                <div className="text-gray-500 text-sm">Connect on Topmate</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
