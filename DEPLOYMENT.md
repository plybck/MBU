# Music Business Unlocked - Deployment Guide

## Quick Start

This guide will help you deploy Music Business Unlocked to your custom domain using either Netlify or Vercel.

## Prerequisites

- Your domain name (e.g., `musicbusinessunlocked.com`)
- Access to your domain's DNS settings
- GitHub repository with your code

## Option 1: Deploy with Netlify (Recommended)

### Step 1: Deploy to Netlify

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Select your repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

3. **Deploy**
   - Click "Deploy site"
   - Wait for deployment to complete
   - Note your temporary Netlify URL (e.g., `amazing-site-123456.netlify.app`)

### Step 2: Connect Your Custom Domain

1. **Add Custom Domain in Netlify**
   - Go to your site dashboard
   - Click "Domain settings"
   - Click "Add custom domain"
   - Enter your domain (e.g., `musicbusinessunlocked.com`)

2. **Configure DNS**
   - **Option A: Use Netlify DNS (Recommended)**
     - Copy the 4 nameservers from Netlify
     - Update your domain registrar's nameservers
     - Wait 24-48 hours for DNS propagation

   - **Option B: Use Your Current DNS Provider**
     - Add these DNS records:
       ```
       Type: CNAME
       Name: www
       Value: amazing-site-123456.netlify.app

       Type: A
       Name: @
       Value: 75.2.60.5
       ```

3. **Enable HTTPS**
   - Netlify will automatically provision SSL certificate
   - Enable "Force HTTPS" in domain settings

## Option 2: Deploy with Vercel

### Step 1: Deploy to Vercel

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your Vercel URL (e.g., `your-app-123456.vercel.app`)

### Step 2: Connect Your Custom Domain

1. **Add Custom Domain in Vercel**
   - Go to your project dashboard
   - Click "Settings" → "Domains"
   - Add your domain (e.g., `musicbusinessunlocked.com`)

2. **Configure DNS**
   - Add these DNS records:
     ```
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com

     Type: A
     Name: @
     Value: 76.76.19.61
     ```

3. **HTTPS**
   - Vercel automatically provisions SSL certificates

## Environment Variables

Create a `.env.production` file or set environment variables in your deployment platform:

```env
NODE_ENV=production
VITE_APP_URL=https://yourdomain.com
VITE_APP_NAME="Music Business Unlocked"
```

## DNS Configuration Examples

### Cloudflare
```
Type: CNAME, Name: www, Content: your-site.netlify.app, Proxy: Yes
Type: A, Name: @, Content: 75.2.60.5, Proxy: Yes
```

### Google Domains
```
Type: CNAME, Name: www, Data: your-site.netlify.app
Type: A, Name: @, Data: 75.2.60.5
```

### GoDaddy
```
Type: CNAME, Host: www, Points to: your-site.netlify.app
Type: A, Host: @, Points to: 75.2.60.5
```

## Verification Steps

1. **Check DNS Propagation**
   - Use [DNS Checker](https://dnschecker.org) to verify DNS propagation
   - May take 24-48 hours to fully propagate

2. **Test Your Site**
   - Visit `https://yourdomain.com`
   - Verify SSL certificate (green lock icon)
   - Test all functionality

3. **Performance Check**
   - Use [GTmetrix](https://gtmetrix.com) to check site speed
   - Use [Google PageSpeed Insights](https://pagespeed.web.dev) for performance metrics

## Troubleshooting

### Common Issues

1. **Site Not Loading**
   - Check DNS records are correct
   - Verify build succeeded
   - Check for typos in domain name

2. **SSL Certificate Issues**
   - Wait 24 hours for automatic provisioning
   - Check DNS propagation is complete
   - Verify domain ownership

3. **404 Errors on Page Refresh**
   - Ensure redirect rules are set up (handled by netlify.toml or vercel.json)
   - Check SPA routing configuration

### Getting Help

- **Netlify**: Check [Netlify Docs](https://docs.netlify.com) or [Support](https://netlify.com/support)
- **Vercel**: Check [Vercel Docs](https://vercel.com/docs) or [Support](https://vercel.com/support)
- **DNS**: Contact your domain registrar's support

## Post-Deployment Checklist

- [ ] Domain loads correctly
- [ ] SSL certificate is active
- [ ] All pages and features work
- [ ] Performance is acceptable
- [ ] Analytics are tracking (if enabled)
- [ ] Contact forms work (if applicable)
- [ ] Payment processing works (if enabled)

## Security Considerations

- SSL certificate is properly configured
- Security headers are set (handled by netlify.toml/vercel.json)
- Environment variables are secure
- API keys are not exposed in client-side code

## Maintenance

- Monitor site performance and uptime
- Keep dependencies updated
- Review analytics regularly
- Test functionality periodically
- Backup your code and configurations

---

**Need help?** Check the platform-specific documentation or contact support for your chosen hosting provider.