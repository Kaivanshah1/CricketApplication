import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const playerSchema = z.object({
  name: z.string().min(2, { message: "You must enter the name" }),
  role: z.enum(['Batsman', 'Bowler', 'All Rounder', 'WK']),
  isCaptain: z.boolean(),
  isViceCaptain: z.boolean(),
})

export type PlayerFormData = z.infer<typeof playerSchema>

type PlayerFormComponentProps = {
  onSubmit: (data: PlayerFormData) => void;
  initialData?: PlayerFormData;
  hasCaptain: boolean;
  hasViceCaptain: boolean;
}

export function PlayerFormComponent({ onSubmit, initialData, hasCaptain, hasViceCaptain }: PlayerFormComponentProps) {
  const form = useForm<PlayerFormData>({
    resolver: zodResolver(playerSchema),
    defaultValues: initialData || {
      name: '',
      role: 'Batsman',
      isCaptain: false,
      isViceCaptain: false,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Batsman">Batsman</SelectItem>
                  <SelectItem value="Bowler">Bowler</SelectItem>
                  <SelectItem value="All Rounder">All Rounder</SelectItem>
                  <SelectItem value="WK">Wicket Keeper</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isCaptain"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={hasCaptain && !field.value}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Captain
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isViceCaptain"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={hasViceCaptain && !field.value}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Vice-Captain
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {initialData ? 'Update Player' : 'Add Player'}
        </Button>
      </form>
    </Form>
  )
}