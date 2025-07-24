import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  declaration: false,
  sourcemap: false,
  rollup: {
    inlineDependencies: true,
    esbuild: { target: 'node18', minify: true },
  },
});
