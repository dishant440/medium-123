import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify,decode } from 'hono/jwt';

type Variable = {
	userId: string;
}


export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: Variable
}>();

blogRouter.use("/*", async (c, next) => {
	const jwt = c.req.header('Authorization') || "";
  // console.log(jwt);
  
	if (!jwt) {
	  c.status(401);
	  return c.json({ error: "invalid token try signing in" });
	}
  const jwttoken = jwt.split(" ")[1];

  
	try {
	  const payload = await verify(jwttoken, c.env.JWT_SECRET);
  
	  if (!payload) {
		c.status(401);
		return c.json({ error: "you are not authorized" });
	  }
    const decoded = await decode(jwttoken);
    console.log(decoded);
        
    const id = decoded.payload.id as string;
    
    
	  c.set('userId', id);
  	  await next();

	} catch (error) {
	  c.status(401);
	  return c.json({ error: "unauthorized user sign in" });
	}
  });
  

// Route to post blog
blogRouter.post("/create", async (c) => {
  const body = await c.req.json();
  const id = c.get("userId");

  const prisma = new PrismaClient({
	datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

  try {
    const newBlog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: id
      }
    });

    return c.json({
      id: newBlog.id,
      message:"blog created successfully"
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return c.json({ message: "error creating blog" });
  } finally {
    await prisma.$disconnect();
  }
});
// Route to fetch all the blog articles
blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

  try {
    const Blog = await prisma.blog.findMany({
      select:{
        title: true,
        content:true,
        id:true,
        author:{
          select:{
            name: true,
          }
        }
      }
    });
    return c.json({ 
      Blog
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    c.status(411);
    return c.json({
      message: "error fetching blogs"
    });
  } finally {
    await prisma.$disconnect();
  }
});

// Route to update the blog
blogRouter.put('/', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
	datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

  try {
    const Blog = await prisma.blog.update({
      where: {
        id: body.id
      },
      data: {
        title: body.title,
        content: body.content
      }
    });
    return c.json({
      message: "blog updated",
      id: Blog.id,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return c.json({ message: "error updating blog" });
  } finally {
    await prisma.$disconnect();
  }
});

// Route to fetch blog posts
blogRouter.get('/:id', async (c) => {
  const Id = await c.req.param('id');
  const prisma = new PrismaClient({
	datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

  try {
    const Blog = await prisma.blog.findFirst({
      where: {
        id: Id
      },
    });
    return c.json({ 
      Blog
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    c.status(411);
    return c.json({
      message: "error fetching blog"
    });
  } finally {
    await prisma.$disconnect();
  }
});





