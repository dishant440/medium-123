import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign } from 'hono/jwt'




export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {

        const user = await prisma.user.create({
            data: {
                name:body.name,
                email: body.email,
                username: body.username,
                password: body.password,
            },
        });

        const token =await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({
            id: user.id,
            message: 'Sign Up Successful',
            token: token,
        });
    } catch (error) {
        return c.json({ message: 'Error during signup', error });
    } 
});


userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try {
        const exist = await prisma.user.findFirst({
            where: {
                username: body.username,
                password: body.password
            }

        });
        if (!exist) {
            c.status(401)
            return c.json({
                message: "unauthorized user"
            })
        }
    
        
        const token = await sign({ id: exist.id }, c.env.JWT_SECRET);
        return c.json({
            id:exist.id,
            message: 'Signin Successfull',
            token: token
        });

    } catch (error) {
        return c.json({ error: error });
    }
});


userRouter.delete('/all', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      await prisma.user.deleteMany({});
      return c.json({
        message: "All user have been deleted",
      });
    } catch (error) {
      console.error("Error deleting all user:", error);
      c.status(500);
      return c.json({
        message: "Error deleting user",
      });
    } finally {
      await prisma.$disconnect();
    }
  });
  