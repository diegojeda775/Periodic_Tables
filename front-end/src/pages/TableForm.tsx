import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {z} from 'zod';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Table name must be at least 2 characters"
  }),
  capacity: z.string()
})


function TableForm() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      capacity: ""
    }
  })


  return (
    <div>
      <h3>New Table</h3>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Table Name</FormLabel>
                <FormControl>
                  <Input placeholder='e.g. Table01' {...field}/>
                </FormControl>
                <FormDescription>
                  Please enter table name.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Table Capacity</FormLabel>
                <FormControl>
                  <Input type="number" placeholder='e.g. 2' {...field}/>
                </FormControl>
                <FormDescription>
                  Please enter how many people table can seat.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit" className="">Submit</Button>
          <Button type="button" className="" variant={"destructive"} onClick={()=> navigate("/")}>
            Cancel
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default TableForm