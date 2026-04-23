const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const publicDir = path.join(__dirname, 'public');

// Copy all HTML files from src/pages to public/ and fix paths
if (fs.existsSync(pagesDir)) {
    const files = fs.readdirSync(pagesDir);
    files.forEach(file => {
        if (file.endsWith('.html')) {
            let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
            // Remove ../../public/ prefixes for assets
            content = content.replace(/\.\.\/\.\.\/public\//g, '');
            // Write modified file to public
            fs.writeFileSync(path.join(publicDir, file), content);
            console.log(`Processed ${file}`);
        }
    });
}

// Update public/index.html to remove ../src/pages/ prefixes for links
const indexPath = path.join(publicDir, 'index.html');
if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    indexContent = indexContent.replace(/\.\.\/src\/pages\//g, '');
    fs.writeFileSync(indexPath, indexContent);
    console.log('Processed index.html');
}

console.log('Build completed successfully!');
