import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMG_DIR = 'public/img';

async function getFiles(dir: string): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

async function convertToWebp(): Promise<void> {
  try {
    const files = await getFiles(IMG_DIR);
    const imageExtensions = ['.jpg', '.jpeg', '.png'];

    const imagesToConvert = files.filter(file => 
      imageExtensions.includes(path.extname(file).toLowerCase())
    );

    console.log(`Found ${imagesToConvert.length} images to convert.`);

    for (const file of imagesToConvert) {
      const extension = path.extname(file);
      const outputPath = file.replace(extension, '.webp');
      
      await sharp(file)
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`Converted: ${path.relative(process.cwd(), file)} -> ${path.relative(process.cwd(), outputPath)}`);
      
      // Remove the original file
      await fs.unlink(file);
      console.log(`Removed original: ${path.relative(process.cwd(), file)}`);
    }

    console.log('Conversion and cleanup completed.');
  } catch (error) {
    console.error('Error during conversion:', error);
    process.exit(1);
  }
}

convertToWebp();
