import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify, decode } from 'hono/jwt';

type userVariable = {
  userId:string;
}

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: userVariable
}>();

blogRouter.use("/*", async (c, next) => {
  const jwt = c.req.header('Authorization') || "";

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
    const id = decoded.payload.id as string;
    console.log("id is " + id);

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
  let id = c.get("userId");
  console.log("/create id " + id);
  
  

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const newBlog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: id,

      }
    });

    return c.json({
      id: newBlog.id,
      authorid: newBlog.authorId,
      message: "blog created successfully"
    });
  } catch (error:any) {
    return c.json({ message: "error creating blog",
      error:error.message });
     
  } finally {
    await prisma.$disconnect();
  }
});
// Route to fetch all the blog articles
blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const Id = c.get("userId")
  console.log("/bulk "+Id);
  

  try {
    const Blog = await prisma.blog.findMany({
      select: {
        title: true,
        content: true,
        id: true,
        author: true,
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
  const Id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Id,
      },
      include: {
        author: true
      },
    });

    if (!blog) {
      return c.json({
        message: "Blog not found"
      });
    }
    console.log(blog);

    console.log(blog.author.name);

    return c.json({
      blog
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    c.status(500);
    return c.json({
      message: "Error fetching blog",
    });
  } finally {
    await prisma.$disconnect();
  }
});

// Add your routes to the router
blogRouter.delete('/all', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.blog.deleteMany({});
    return c.json({
      message: "All blogs have been deleted",
    });
  } catch (error) {
    console.error("Error deleting all blogs:", error);
    c.status(500);
    return c.json({
      message: "Error deleting all blogs",
    });
  } finally {
    await prisma.$disconnect();
  }
});
