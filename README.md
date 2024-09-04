# Vite Plugin Clickable File Path

Convert Vite console output file paths into clickable file URLs.

## Installation

Install the plugin using npm:

```sh
npm install vite-plugin-clickable-file-path --save-dev
```

## Usage

Add the plugin to your Vite configuration:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import clickableFilePathsPlugin from 'vite-plugin-clickable-file-path';

export default defineConfig({
  plugins: [clickableFilePathsPlugin()]
});
```

## Configuration

No additional configuration is required. The plugin automatically converts file paths in Vite's console output to clickable URLs.

## License

This project is licensed under the MIT License.
