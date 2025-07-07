#!/usr/bin/env node

// Deployment Readiness Check for Music Business Unlocked
const fs = require('fs');
const path = require('path');

console.log('🎵 Music Business Unlocked - Deployment Check\n');

const checks = [
  {
    name: 'Package.json exists',
    check: () => fs.existsSync('package.json'),
    fix: 'Make sure package.json is in the root directory'
  },
  {
    name: 'Build script exists',
    check: () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return pkg.scripts && pkg.scripts.build;
    },
    fix: 'Add "build": "tsc && vite build" to package.json scripts'
  },
  {
    name: 'Netlify config exists',
    check: () => fs.existsSync('netlify.toml'),
    fix: 'netlify.toml file is missing'
  },
  {
    name: 'Vercel config exists',
    check: () => fs.existsSync('vercel.json'),
    fix: 'vercel.json file is missing'
  },
  {
    name: 'App.tsx has default export',
    check: () => {
      const appContent = fs.readFileSync('App.tsx', 'utf8');
      return appContent.includes('export default');
    },
    fix: 'Make sure App.tsx has a default export'
  },
  {
    name: 'Dist folder in gitignore',
    check: () => {
      if (!fs.existsSync('.gitignore')) return false;
      const gitignore = fs.readFileSync('.gitignore', 'utf8');
      return gitignore.includes('dist');
    },
    fix: 'Add "dist" to .gitignore file'
  }
];

let allPassed = true;

checks.forEach(({ name, check, fix }) => {
  const passed = check();
  const icon = passed ? '✅' : '❌';
  console.log(`${icon} ${name}`);
  
  if (!passed) {
    console.log(`   → ${fix}\n`);
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('🎉 All checks passed! Your app is ready for deployment.');
  console.log('\nNext steps:');
  console.log('1. Push your code to GitHub');
  console.log('2. Deploy to Netlify or Vercel');
  console.log('3. Connect your custom domain');
  console.log('4. Update environment variables');
} else {
  console.log('⚠️  Please fix the issues above before deploying.');
}

console.log('\nFor detailed instructions, see DOMAIN_CONNECTION_GUIDE.md');