import { z } from "zod";

export const logInUserValidationSchema = z.object({
    body: z.object({
        email: z.string({
            invalid_type_error: 'Email must be a string'
          }).email({ message: 'Invalid email format' }),
        password: z.string({
         invalid_type_error: 'Password must be a string'
        }).min(8, { message: 'Password must be at least 8 characters long' }),
    
    })
})


