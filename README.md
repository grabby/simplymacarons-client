# Simply Macarons - Ecommerce Website

A beautiful, modern ecommerce website for Simply Macarons, featuring clean URLs, SEO optimization, and a comprehensive product catalog.

## Features

- **Clean URLs**: No .html extensions in URLs
- **SEO Optimized**: Meta tags, structured data, sitemap, and robots.txt
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Product Catalog**: 30+ macaron flavors with images and descriptions
- **Shopping Cart**: Full cart functionality with local storage
- **Order Management**: Invoice generation and admin panel
- **Blog**: Content marketing with dairy-free macaron guide
- **Care Instructions**: Comprehensive macaron storage and handling guide

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5175/`

### Available Pages

- **Home**: `http://localhost:5175/`
- **Blog**: `http://localhost:5175/blog`
- **Cart**: `http://localhost:5175/cart`
- **Invoice**: `http://localhost:5175/invoice`
- **Admin**: `http://localhost:5175/admin`
- **Macaron Care**: `http://localhost:5175/macaron-care`

## Production Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized files.

### Production Server

For production deployment with clean URLs, use the included Express server:

```bash
npm start
```

The production server will run on port 3000 (or the PORT environment variable).

### Alternative Deployment

For static hosting (GitHub Pages, Netlify, etc.), the build files in `dist` can be deployed directly. However, clean URLs will require server configuration.

## Clean URLs Implementation

The site uses clean URLs without .html extensions:

- `/` instead of `/index.html`
- `/blog` instead of `/blog.html`
- `/cart` instead of `/cart.html`
- etc.

### Development
In development, Vite handles routing automatically.

### Production
The Express server (`server.js`) handles clean URL routing by:
1. Serving static files from the `dist` directory
2. Mapping clean URLs to their corresponding HTML files
3. Providing fallback routing for SPA-like behavior

## File Structure

```
SimplyMacarons/
├── src/
│   ├── assets/
│   │   ├── images/          # Product and site images
│   │   └── videos/          # Video assets
│   ├── css/
│   │   └── style.css        # Main stylesheet
│   ├── data/
│   │   └── macarons.js      # Product data and pricing
│   └── js/
│       ├── main.js          # Main JavaScript
│       ├── cart.js          # Cart functionality
│       └── cart-page.js     # Cart page logic
├── index.html               # Home page
├── blog.html                # Blog page
├── cart.html                # Cart page
├── invoice.html             # Invoice page
├── admin.html               # Admin panel
├── macaron-care.html        # Care instructions
├── sitemap.xml              # SEO sitemap
├── robots.txt               # SEO robots file
├── server.js                # Production server
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies and scripts
```

## SEO Features

- **Meta Tags**: Comprehensive meta tags for all pages
- **Structured Data**: JSON-LD schema markup
- **Canonical URLs**: Prevent duplicate content issues
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Search engine crawling instructions
- **Open Graph**: Social media sharing optimization

## Product Catalog

The site features 30+ macaron flavors including:

### Classic Flavors
- Vanilla Bean
- Double Chocolate
- Strawberry
- Lemon Buttercream

### Fruit Flavors
- Raspberry, Cherry, Apple, Banana
- Watermelon, Guava, Mango
- Blueberry Lemonade

### Gourmet Flavors
- Lavender, Rose, Earl Grey
- Coffee, Matcha Green Tea
- Creme Brulee, Red Velvet
- Cookies and Cream, Biscoff

### Fun Flavors
- Bubble Gum, Cola, Cotton Candy
- Marshmallow

### Nut Flavors
- Pistachio, Cashew Caramel

### Tropical Flavors
- Fuzzy Peach, Passion Fruit

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary to Simply Macarons. 