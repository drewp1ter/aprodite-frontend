/** @type {import('next').NextConfig} */

import path from 'path'
import loaderUtils from 'next/dist/compiled/loader-utils3/index.js'

// next.js/packages/next/src/build/webpack/config/blocks/css/loaders/getCssModuleLocalIdent.ts
function hashOnlyIdent(context, _, exportName) {
  return loaderUtils
    .getHashDigest(
      Buffer.from(`filePath:${path.relative(context.rootContext, context.resourcePath).replace(/\\+/g, '/')}#className:${exportName}`),
      'md4',
      'base64',
      6
    )
    .replace(/[^a-zA-Z0-9-_]/g, '_')
    .replace(/^(-?\d|--)/, '_$1')
}

// https://webpack.js.org/loaders/css-loader/
function upadteCssLoaderConfig(config) {
  for (const rule of config.module.rules) {
    if (!Array.isArray(rule.oneOf)) continue
    for (const moduleLoader of rule.oneOf) {
      if (!Array.isArray(moduleLoader.use)) continue
      for (const loader of moduleLoader.use) {
        if (/[\/|\\]css-loader[\/|\\]/i.test(loader.loader)) {
          // we got to the css-loader configuration
          const { modules } = loader.options
          if (typeof modules === 'object') {
            modules.getLocalIdent = hashOnlyIdent
          }
        }
      }
    }
  }
}

const nextConfig = {
  webpack(config, { dev }) {
    !dev && upadteCssLoaderConfig(config)

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '102922.selcdn.ru',
        port: '',
        pathname: '**'
      }
    ]
  }
}

export default nextConfig
