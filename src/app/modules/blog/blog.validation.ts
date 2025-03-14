import { z } from "zod";

export const blogValidationSchema = z.object({
    body: z.object({
        title: z.string({
          invalid_type_error: 'Blog title must be string'
        }).max(200, { message: 'Blog title can be a maximum of 200 characters long' }),
  
        content: z.string({
          invalid_type_error: 'Blog content must be string'
        }),
        author: z.string(),
    })
});
