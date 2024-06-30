import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    // onSuccess: async () => {
    //     // Copy the types.ts file to the output directory
    //     const srcPath = join(__dirname, 'src', 'types.ts')
    //     const outDir = join(__dirname, 'dist')
    //     await copy(srcPath, join(outDir, 'types.ts'))
    //     console.log('Copied types.ts to the output directory')
    // },
})
