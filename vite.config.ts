import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// spec.md §2: dist/index.html must open from disk (file://). base:'./' fixes asset paths, but
// Chrome still refuses <script type="module" src="..."> on file:// (origin "null" CORS).
// Inlining JS+CSS(+fonts) into index.html sidesteps that; public/ (the PDFs) is still copied
// next to it as separate files.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
});
