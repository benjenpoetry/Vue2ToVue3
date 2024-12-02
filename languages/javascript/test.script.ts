import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        include: [
            './lezer/__test__/script.test.ts'
        ]
    }
});
