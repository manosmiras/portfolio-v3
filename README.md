# Portfolio v3
This is the third iteration of my personal portfolio and blog: https://manosmiras.com/. 
Built with [Nuxt 3](https://nuxt.com/) and [Nuxt Content v3](https://content.nuxt.com/), this project showcases my game development projects and technical blog posts.

## Features
- **File-based CMS:** Uses [Nuxt Content v3](https://content.nuxt.com/) for managing portfolio items and blog posts via Markdown.
- **Dynamic Routing:** Automatically generates pages for each content file.
- **Image Optimization:** Automatic conversion to WebP format for improved performance.
- **Responsive Design:** Fully responsive layout built with tailwind and modern CSS.
- **Table of Contents:** Automatically generated for long-form blog posts.

## Project Structure
- `content/`: Markdown files for blog posts and portfolio projects.
  - `blog/`: Technical blog posts.
  - `portfolio/`: Game development and technical projects.
- `components/`: Reusable Vue components.
- `pages/`: Nuxt pages (includes dynamic routes for content).
- `public/`: Static assets like images.
- `scripts/`: Custom utility scripts.

## Content Management
### Adding a Portfolio Project
1. Create a new `.md` file in `content/portfolio/`.
2. Add the required frontmatter (title, description, date, etc.).
3. Add your content in Markdown format.
4. Images should be placed in `public/img/portfolio/` and then converted using the image script.

### Adding a Blog Post
1. Create a new `.md` file in `content/blog/`.
2. Follow the same steps as adding a portfolio project.

## Setup
Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server
Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Custom Scripts
### Image Conversion
To maintain high performance and small file sizes, all images in `public/img` should be converted to `.webp`. The original files (`.jpg`, `.jpeg`, `.png`) are automatically deleted after conversion.

Run the conversion script:
```bash
npm run convert-images
```

## Production
Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:
```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
