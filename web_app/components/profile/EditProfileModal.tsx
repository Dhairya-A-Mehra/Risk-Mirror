"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Update the import path if your Select component is located elsewhere, for example:
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Or, if you actually have the file in a different directory, adjust accordingly.
// If the file does not exist, create 'select.tsx' in the 'components/ui' directory or install the required UI library.
import { User } from "@/models/user";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  persona: z.string().min(1, "Please select a persona."),
});

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: User;
  onProfileUpdate: (updatedUser: Partial<User>) => void;
}

export function EditProfileModal({ isOpen, setIsOpen, user, onProfileUpdate }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user.fullName,
      persona: user.profile.persona,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      toast.success('Profile updated successfully!');
      onProfileUpdate(values); // Update parent component state instantly
      setIsOpen(false);
      router.refresh(); // Re-fetches server component data in the background
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Your Profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
            <FormField control={form.control} name="fullName" render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="persona" render={({ field }) => (
              <FormItem>
                <FormLabel>Investor Persona</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select your persona" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="Cautious Starter">Cautious Starter</SelectItem>
                    <SelectItem value="Balanced Achiever">Balanced Achiever</SelectItem>
                    <SelectItem value="Heavy Investor">Heavy Investor</SelectItem>
                    <SelectItem value="Visionary Builder">Visionary Builder</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}