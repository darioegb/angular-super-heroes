module.exports = {
  globDirectory: 'dist/superheroes/',
  globPatterns: [
    '**/*.{js,css,html,png,svg,webp}',
    'assets/**/*.{css,html,js,json,png,svg,woff,woff2}',
  ],
  globFollow: true, // follow symlinks
  globStrict: true, // fail the build if anything goes wrong while reading the files
  globIgnores: [
    // Ignore Angular's ES5 bundles
    // With this, we eagerly load the es2015
    // bundles and we only load/cache the es5 bundles when requested
    // i.e., on browsers that need them
    // Reference: https://github.com/angular/angular/issues/31256#issuecomment-506507021
    '**/*-es5.*.js',
  ],
  swSrc: 'dist/superheroes/sw.js',
  swDest: 'dist/superheroes/sw.js',
};
