import { openai } from '@ai-sdk/openai';
import { experimental_generateImage as generateImage } from 'ai';
import fs from 'node:fs';
import path from 'node:path';
import 'dotenv/config';

async function main() {
  // Example 1: Edit a single image using Uint8Array
  console.log('Editing an existing image with Uint8Array...');
  const editResult = await generateImage({
    model: openai.image('gpt-image-1'),
    images: [fs.readFileSync(path.join(__dirname, '../../data/comic-cat.png'))],
    prompt: 'Add a rainbow in the sky above the cat',
    size: '1024x1024',
  });

  fs.writeFileSync(
    'edited-image.png',
    Buffer.from(editResult.image.uint8Array)
  );

  // Example 2: Edit using base64-encoded image
  console.log('Editing an existing image with base64...');
  const imageBuffer = fs.readFileSync(path.join(__dirname, '../../data/comic-cat.png'));
  const base64Image = imageBuffer.toString('base64');
  
  const editResultBase64 = await generateImage({
    model: openai.image('gpt-image-1'),
    images: [base64Image],
    prompt: 'Add stars in the night sky',
  });

  fs.writeFileSync(
    'edited-image-base64.png',
    Buffer.from(editResultBase64.image.uint8Array)
  );

  // Example 3: Edit multiple images with GPT-Image-1
  console.log('Editing multiple images...');
  const multiEditResult = await generateImage({
    model: openai.image('gpt-image-1'),
    images: [
      fs.readFileSync(path.join(__dirname, '../../data/comic-cat.png')),
      fs.readFileSync(path.join(__dirname, '../../data/screenshot-editor.png')),
    ],
    prompt: 'Create a creative collage combining these images',
    n: 2, // Generate 2 variations
    providerOptions: {
      openai: {
        quality: 'high',
        background: 'transparent',
      },
    },
  });

  multiEditResult.images.forEach((image, index) => {
    fs.writeFileSync(
      `multi-edit-${index}.png`,
      Buffer.from(image.uint8Array)
    );
  });

  console.log('All operations completed!');
}

main().catch(console.error); 