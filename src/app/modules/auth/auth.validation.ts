import { z } from "zod";

export const userValidationSchema = z.object({
  body: z.object({
      name: z.string({
        invalid_type_error: 'Name must be a string'
      }).max(50, { message: 'Name can be a maximum of 50 characters long' }),

      email: z.string({
        invalid_type_error: 'Email must be a string'
      }).email({ message: 'Invalid email format' }),

      password: z.string({
        invalid_type_error: 'Password must be a string'
      })
      .min(8, { message: 'Password must be at least 8 characters long' }),
  })
});


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


