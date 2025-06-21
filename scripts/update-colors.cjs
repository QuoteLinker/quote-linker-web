const fs = require('fs');
const path = require('path');

const replacements = {
  'bg-electric-blue': 'bg-primary-500',
  'text-electric-blue': 'text-primary-500',
  'ring-electric-blue': 'ring-primary-500',
  'focus:border-electric-blue': 'focus:border-primary-500',
  'focus:ring-electric-blue': 'focus:ring-primary-500',
  'hover:bg-electric-blue': 'hover:bg-primary-500',
  'border-electric-blue': 'border-primary-500',
  'hover:text-electric-blue': 'hover:text-primary-500',
  'focus:ring-offset-electric-blue': 'focus:ring-offset-primary-500',
  'ring-electric-blue/20': 'ring-primary-500/20',
  'hover:bg-[#00D4E5]': 'hover:bg-primary-600',
  'hover:bg-electric-blue/90': 'hover:bg-primary-600',
  'focus:border-electric-blue': 'focus:border-primary-500',
  'border-electric-blue': 'border-primary-500',
};

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;

  for (const [oldValue, newValue] of Object.entries(replacements)) {
    const regex = new RegExp(oldValue, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, newValue);
      hasChanges = true;
    }
  }

  if (hasChanges) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.next')) {
      walkDir(filePath);
    } else if (stat.isFile() && /\.(tsx|jsx|ts|js|css)$/.test(file)) {
      updateFile(filePath);
    }
  });
}

walkDir('./src');
