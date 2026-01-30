import { builder } from '@builder.io/react';

// Initialize Builder.io with your API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || '');

export { builder };
