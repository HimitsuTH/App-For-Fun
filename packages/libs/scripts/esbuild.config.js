// const childProcess = require('child_process')

// let proc

// const onRebuild = () => {
//   proc?.kill()
//   proc = childProcess.spawn('yarn', ['start'], {
//     stdio: 'inherit',
//     stderr: 'inherit',
//     detached: false,
//   })
// }

module.exports = {
  esbuild: {
    outdir: 'dist',
    bundle: true,
    minify: false,
    // watch: { onRebuild },
    loader: {
      '.ttf': 'binary',
      '.png': 'binary',
      '.pdf': 'binary',
      '.html': 'text',
    },
    sourcemap: false,
    keepNames: true,
    external: [
      'mysql2',
      'bcrypt',
      'pg-hstore',
      // 'ssh2',
      // 'ssh2-sftp-client',
      // 'bull',
    ],
    target: 'es2021',
  },
  prebuild: async () => {
    console.log('prebuild start')
    const rimraf = (await import('rimraf')).default
    rimraf.sync('./dist')
    console.log('prebuild done')
  },
  postbuild: async () => {
    console.log('postbuild start')
    const cpy = (await import('cpy')).default
    await cpy(
      [
        '../../sequelize',
        // "src/**/*.graphql", // Copy all .graphql files
        // "!src/**/*.{tsx,ts,js,jsx}", // Ignore already built files
      ],
      'dist',
    )
    // await cpy(
    //   [
    //     // '../../packages/libs/views',
    //     // "src/**/*.graphql", // Copy all .graphql files
    //     // "!src/**/*.{tsx,ts,js,jsx}", // Ignore already built files
    //   ],
    //   '.',
    // )
    console.log('postbuild done')
  },
}
