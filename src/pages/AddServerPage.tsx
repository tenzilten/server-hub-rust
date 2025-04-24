
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Upload, Server, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Server name must be at least 3 characters' }).max(50),
  ip: z.string().min(1, { message: 'IP address is required' }),
  port: z.string().regex(/^\d+$/, { message: 'Port must be a number' }).transform(Number),
  website: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
  description: z.string().min(30, { message: 'Description must be at least 30 characters' }),
  country: z.string().min(1, { message: 'Country is required' }),
  banner: z.any().optional(),
  logo: z.any().optional(),
});

const AddServerPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      ip: '',
      port: '28015',
      website: '',
      description: '',
      country: '',
      banner: undefined,
      logo: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      console.log('Form values:', values);
      toast.success('Server submitted successfully! It will be reviewed by admins.');
      setIsSubmitting(false);
      navigate('/servers');
    }, 1500);
  };
  
  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('banner', file);
    }
  };
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('logo', file);
    }
  };

  return (
    <>
      <div className="bg-dark-300 border-b border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-2 text-sm text-muted-foreground">
            <span>Home</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground">Add Server</span>
          </div>
          <h1 className="font-bold text-3xl md:text-4xl mb-4">Add Your Rust Server</h1>
          <p className="text-muted-foreground max-w-2xl">
            Fill out the form below to submit your Rust server to our directory. All submissions are reviewed by our admins before being published.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-full bg-rust-500 flex items-center justify-center text-white font-medium">1</div>
              <h2 className="text-xl font-semibold">Server Information</h2>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Banner Upload */}
                <FormField
                  control={form.control}
                  name="banner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Server Banner (Recommended: 1200x400px)</FormLabel>
                      <FormControl>
                        <div className="w-full rounded-lg border border-dashed border-border bg-background p-4">
                          {bannerPreview ? (
                            <div className="relative">
                              <img 
                                src={bannerPreview} 
                                alt="Banner preview" 
                                className="w-full h-auto aspect-[3/1] object-cover rounded-md"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => {
                                  setBannerPreview(null);
                                  form.setValue('banner', undefined);
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-8">
                              <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                              <p className="text-sm text-muted-foreground mb-2">Drag and drop or click to upload</p>
                              <Input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="banner-upload"
                                onChange={handleBannerUpload}
                              />
                              <label htmlFor="banner-upload">
                                <Button type="button" variant="secondary" size="sm">
                                  Choose File
                                </Button>
                              </label>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        This image will be displayed at the top of your server page.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Server Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Server Name <span className="text-rust-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="My Awesome Rust Server" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Logo Upload */}
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Server Logo</FormLabel>
                        <FormControl>
                          <div className="flex gap-4 items-center">
                            {logoPreview ? (
                              <div className="relative">
                                <img 
                                  src={logoPreview} 
                                  alt="Logo preview" 
                                  className="w-20 h-20 object-cover rounded-md"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute -top-2 -right-2 h-6 w-6 p-0"
                                  onClick={() => {
                                    setLogoPreview(null);
                                    form.setValue('logo', undefined);
                                  }}
                                >
                                  &times;
                                </Button>
                              </div>
                            ) : (
                              <div className="w-20 h-20 border border-dashed border-border rounded-md flex items-center justify-center bg-background">
                                <Server className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                            
                            <div>
                              <Input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="logo-upload"
                                onChange={handleLogoUpload}
                              />
                              <label htmlFor="logo-upload">
                                <Button type="button" variant="outline" size="sm">
                                  Upload Logo
                                </Button>
                              </label>
                              <p className="text-xs text-muted-foreground mt-1">Square, 200x200px recommended</p>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Server Connection Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="ip"
                    render={({ field }) => (
                      <div className="md:col-span-2">
                        <FormItem>
                          <FormLabel>Server IP <span className="text-rust-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="123.456.789.0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="port"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Port <span className="text-rust-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="28015" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://myserver.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          Optional: Link to your server's website
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Server Location <span className="text-rust-500">*</span></FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="United States" className="pl-9" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Country where your server is hosted
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Server Description <span className="text-rust-500">*</span></FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell players about your server, including features, rules, wipe schedule, etc."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Minimum 30 characters. Markdown formatting is supported.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4 flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-rust-500 hover:bg-rust-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Server'}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          
          <div className="bg-rust-500/10 border border-rust-500/20 rounded-lg p-6">
            <h3 className="font-medium mb-3 text-rust-500">Note about server verification</h3>
            <p className="text-sm text-muted-foreground">
              After submission, our system will attempt to verify your server is online by sending a ping. 
              Make sure your server is running and accessible from the internet before submitting.
              Server submissions are reviewed by our admins and usually approved within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddServerPage;
