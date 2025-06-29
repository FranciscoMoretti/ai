# OpenAI Image Generation and Editing

The OpenAI provider now supports both image generation and editing through a unified API using the `generateImage` function.

## How it works

The `doGenerate` method automatically routes to the appropriate OpenAI endpoint based on the parameters:
- If `images` is not provided → calls `/images/generations` endpoint
- If `images` is provided → calls `/images/edits` endpoint

## Examples

### Generate a new image
```typescript
import { openai } from '@ai-sdk/openai';
import { generateImage } from 'ai';

const result = await generateImage({
  model: openai.image('dall-e-3'),
  prompt: 'A sunset over mountains',
});
```

### Edit an existing image
```typescript
const result = await generateImage({
  model: openai.image('dall-e-2'),
  images: imageBuffer, // Uint8Array or URL
  prompt: 'Add a rainbow to the sky',
  mask: maskBuffer, // optional
});
```

### Edit multiple images (gpt-image-1 only)
```typescript
const result = await generateImage({
  model: openai.image('gpt-image-1'),
  images: [image1, image2, image3, image4],
  prompt: 'Create a gift basket with these items',
  n: 2, // Generate 2 variations
});
```

## Supported Models

- **dall-e-2**: Supports single image editing with optional mask
- **gpt-image-1**: Supports editing up to 16 images
- **dall-e-3**: Generation only (no editing support)

## Provider Options

All OpenAI-specific options are supported through `providerOptions`:

```typescript
providerOptions: {
  openai: {
    quality: 'high',
    background: 'transparent',
    // ... other OpenAI-specific options
  }
}
``` 