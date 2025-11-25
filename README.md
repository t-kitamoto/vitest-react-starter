# vitest-react-starter

Vitest開発環境セットアップの手順メモです。

<br/>
  
## 🛠 Viteでプロジェクト作成

```bash
npm create vite@latest
```

<br/>
  
## 🛠 vitest他、必要なパッケージをインストール

```bash
npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event @vitest/coverage-v8
```

<br/>
  
## 🛠 src/vitest.setup.tsを作成

```ts
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

<br/>
  
## 🛠 vite.config.tsを編集

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/vitest.setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});
```
- import { defineConfig } from 'vite/config' → import { defineConfig } from 'vitest/config';

<br/>
  
## 🛠 tsconfig.app.jsonの編集

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client", "vitest/globals", "@testing-library/jest-dom"],
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

- "compilerOptions"の"types":[]内に"vitest/globals", "@testing-library/jest-dom"を追記

<br/>
  
## 🛠 package.jsonにスクリプト追加

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest",
    "coverage": "vitest run --coverage"
  },
```

- npm run test　→ watchモードでテスト
- npm run coverage → テストを一度実行してcoverageを出力

<br/>
