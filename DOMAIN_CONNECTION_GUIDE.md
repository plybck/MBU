# 🚀 Connect Your Domain - Step by Step Guide

## What You'll Need
- Your custom domain name (e.g., `musicbusinessunlocked.com`)
- Access to your domain registrar (where you bought the domain)
- GitHub account with your code repository
- 15-30 minutes

---

## 🎯 Step 1: Choose Your Deployment Platform

**Recommended: Netlify** (easier for beginners)
- ✅ Automatic deployments from GitHub
- ✅ Free SSL certificates
- ✅ Easy domain management
- ✅ Great for React/Vite apps

**Alternative: Vercel** (also excellent)
- ✅ Optimized for React apps
- ✅ Automatic deployments
- ✅ Free SSL certificates

---

## 🚀 Step 2: Deploy to Netlify (Recommended)

### 2.1 Create Netlify Account & Deploy

1. **Go to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Click "Sign up" or "Log in"
   - Choose "GitHub" to sign up/login

2. **Connect Your Repository**
   - Click "New site from Git"
   - Choose "GitHub"
   - Find and select your `music-business-unlocked` repository
   - Click on it

3. **Configure Build Settings**
   ```
   Base directory: (leave empty)
   Build command: npm run build
   Publish directory: dist
   ```
   - Click "Deploy site"

4. **Wait for Deployment**
   - Your site will deploy in 2-5 minutes
   - You'll get a temporary URL like `amazing-site-123456.netlify.app`
   - Click the URL to test your site

### 2.2 Connect Your Custom Domain

1. **Add Your Domain**
   - In your Netlify dashboard, go to "Domain settings"
   - Click "Add custom domain"
   - Enter your domain: `yourdomain.com`
   - Click "Verify"

2. **Choose DNS Setup Method**

   **Option A: Easy Setup (Recommended)**
   - Netlify will show you 4 nameservers like:
     ```
     dns1.p05.nsone.net
     dns2.p05.nsone.net
     dns3.p05.nsone.net
     dns4.p05.nsone.net
     ```
   - Copy these nameservers
   - Go to your domain registrar and update nameservers (see Step 3)

   **Option B: Keep Current DNS**
   - Add these DNS records at your current DNS provider:
     ```
     Type: A
     Name: @ (or root)
     Value: 75.2.60.5

     Type: CNAME  
     Name: www
     Value: your-site-name.netlify.app
     ```

---

## 🌐 Step 3: Update DNS at Your Domain Registrar

### If You Bought Your Domain From:

**GoDaddy:**
1. Log into GoDaddy account
2. Go to "My Products" → "Domains"
3. Click "DNS" next to your domain
4. Change nameservers to the 4 Netlify nameservers
5. Save changes

**Namecheap:**
1. Log into Namecheap account  
2. Go to "Domain List"
3. Click "Manage" next to your domain
4. Go to "Nameservers" section
5. Select "Custom DNS"
6. Enter the 4 Netlify nameservers
7. Save

**Google Domains:**
1. Log into Google Domains
2. Click on your domain
3. Go to "DNS" tab
4. Click "Use custom name servers"
5. Enter the 4 Netlify nameservers
6. Save

**Cloudflare:**
1. Add your domain to Cloudflare
2. Update nameservers at your registrar to Cloudflare's
3. In Cloudflare, add these DNS records:
   ```
   Type: CNAME, Name: www, Content: your-site.netlify.app, Proxy: Yes
   Type: A, Name: @, Content: 75.2.60.5, Proxy: Yes
   ```

---

## ⏰ Step 4: Wait for DNS Propagation

- **Time needed:** 15 minutes to 48 hours (usually 2-4 hours)
- **Check progress:** Use [dnschecker.org](https://dnschecker.org)
- **What happens:** Your domain slowly updates across the internet

---

## 🔒 Step 5: Enable HTTPS (Automatic)

Once DNS propagates:
- Netlify automatically creates SSL certificate
- Your site will be available at `https://yourdomain.com`
- In Netlify, go to "Domain settings" → "HTTPS"
- Enable "Force HTTPS redirect"

---

## ✅ Step 6: Test Everything

1. **Check Your Site**
   - Visit `https://yourdomain.com`
   - Visit `https://www.yourdomain.com`
   - Both should work and show your app

2. **Test Functionality**
   - Try the calculator
   - Test login/signup
   - Check all pages work

3. **Verify SSL**
   - Look for green lock icon in browser
   - Certificate should be valid

---

## 🐛 Troubleshooting

### "Site Not Found" Error
- **Cause:** DNS hasn't propagated yet
- **Solution:** Wait longer, check dnschecker.org

### "Not Secure" Warning  
- **Cause:** SSL certificate not ready
- **Solution:** Wait 1-2 hours after DNS propagates

### Page Refresh Shows 404
- **Cause:** SPA routing issue
- **Solution:** Check that `netlify.toml` is in your repository root

### Build Failed
- **Common fixes:**
  - Check `package.json` has correct build command
  - Ensure all dependencies are listed
  - Check for TypeScript errors

---

## 🚀 Alternative: Deploy to Vercel

If you prefer Vercel:

1. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Deploy with default settings

2. **Add Custom Domain**
   - Go to project settings → "Domains"
   - Add your domain
   - Follow DNS instructions provided

3. **DNS Records for Vercel**
   ```
   Type: A
   Name: @
   Value: 76.76.19.61

   Type: CNAME
   Name: www  
   Value: cname.vercel-dns.com
   ```

---

## 📞 Need Help?

**DNS Issues:**
- Contact your domain registrar's support
- Use online DNS tools to check propagation

**Deployment Issues:**
- Check Netlify/Vercel documentation
- Look at build logs for error messages

**App Issues:**
- Test locally first with `npm run dev`
- Check browser console for errors

---

## 🎉 Success Checklist

- [ ] Site deploys successfully
- [ ] Custom domain added to platform
- [ ] DNS records updated at registrar
- [ ] SSL certificate is active (green lock)
- [ ] Both `yourdomain.com` and `www.yourdomain.com` work
- [ ] All app features work correctly
- [ ] Page refreshes don't show 404 errors

**Congratulations! Your Music Business Unlocked app is now live! 🎵**