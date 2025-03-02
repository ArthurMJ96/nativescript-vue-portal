import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/'],
  declaration: true,
  rollup: {
    esbuild: {
      minify: true,
    },
  },
})
