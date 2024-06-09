import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign } from 'hono/jwt'
import z from 'zod';



export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {
    // Log environment variables to ensure they are loaded correctly
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {

        const user = await prisma.user.create({
            data: {
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
        console.error(error);
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
            message: 'Signin Successfull',
            token: token
        });

    } catch (error) {
        return c.json({ error: error });
    }
});


// export default userRouter;
