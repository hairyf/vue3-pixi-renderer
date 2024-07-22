import { fileURLToPath } from 'url'
import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import unocss from 'unocss/vite'
import { compilerOptions, transformAssetUrls } from '../../packages/vue3-pixi'
import { mdPlugin } from './plugin'

const themeConfig: DefaultTheme.Config = {
  // https://vitepress.dev/reference/default-theme-config
  nav: [
    { text: 'Home', link: '/' },
    {
      text: 'Docs',
      items: [
        { text: 'Quick Start', link: '/guide/quick-start' },
        { text: 'Usage', link: '/guide/usage' },
        { text: 'Nuxtjs', link: '/guide/nuxtjs' },
        { text: 'API Reference', link: '/guide/api-reference/renderer' },
        { text: 'Elements', link: '/guide/elements/animated-sprite' },
        { text: 'Components', link: '/guide/components/application' },
        { text: 'Composition API', link: '/guide/composition-api/on-tick' },
      ],
    },
    {
      text: 'Examples',
      items: [
        { text: 'Basic', link: '/examples/basic/blend-modes' },
        { text: 'Sprite', link: '/examples/sprite/animated-sprite-animation-speed' },
        { text: 'Text', link: '/examples/text/bitmap-text' },
        { text: 'Graphics', link: '/examples/graphics/advanced' },
        { text: 'Events', link: '/examples/events/click' },
        { text: 'Masks', link: '/examples/masks/filter' },
        { text: 'Filters Basic', link: '/examples/filters-basic/blur' },
        // { text: 'Filters Advanced', link: '/examples/filters-advanced/custom' },
        // { text: 'Advanced', link: '/examples/advanced/collision-detection' },
        // { text: 'Mesh And Shaders', link: '/examples/mesh-and-shaders/instanced-geometry' },
      ],
    },
  ],
  sidebar: {
    '/guide/': [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Quick Start', link: '/guide/quick-start' },
          { text: 'Usage', link: '/guide/usage' },
          { text: 'Nuxtjs', link: '/guide/nuxtjs' },
          { text: 'Troubleshooting', link: '/guide/troubleshooting' },
        ],
      },
      {
        text: 'API Reference',
        items: [
          {
            text: 'Renderer',
            link: '/guide/api-reference/renderer',
          },
          {
            text: 'Props',
            link: '/guide/api-reference/props',
          },

          {
            text: 'Events',
            link: '/guide/api-reference/events',
          },
        ],
      },
      {
        text: 'Elements',
        items: [
          { text: 'AnimatedSprite', link: '/guide/elements/animated-sprite' },
          { text: 'BitmapText', link: '/guide/elements/bitmap-text' },
          { text: 'Container', link: '/guide/elements/container' },
          { text: 'Graphics', link: '/guide/elements/graphics' },
          { text: 'Mesh', link: '/guide/elements/mesh' },
          { text: 'NineSlicePlane', link: '/guide/elements/nine-slice-plane' },
          { text: 'ParticleContainer', link: '/guide/elements/particle-container' },
          { text: 'SimplePlane', link: '/guide/elements/simple-plane' },
          { text: 'MeshRope', link: '/guide/elements/mesh-rope' },
          { text: 'Sprite', link: '/guide/elements/sprite' },
          { text: 'Text', link: '/guide/elements/text' },
          { text: 'TilingSprite', link: '/guide/elements/tiling-sprite' },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: 'Application', link: '/guide/components/application' },
          { text: 'Transition', link: '/guide/components/transition' },
          { text: 'Loader', link: '/guide/components/loader' },
          { text: 'External', link: '/guide/components/external' },
        ],
      },
      {
        text: 'Composition API',
        items: [
          { text: 'onTick', link: '/guide/composition-api/on-tick' },
          { text: 'useApplication', link: '/guide/composition-api/use-application' },
          { text: 'useRenderer', link: '/guide/composition-api/use-renderer' },
          { text: 'useStage', link: '/guide/composition-api/use-stage' },
          { text: 'useScreen', link: '/guide/composition-api/use-screen' },
          { text: 'useTrack', link: '/guide/composition-api/use-track' },
        ],
      },
    ],
    '/examples/': [
      {
        text: 'Basic',
        collapsed: true,
        items: [
          { text: 'Blend Modes', link: '/examples/basic/blend-modes' },
          { text: 'Cache As Bitmap', link: '/examples/basic/cache-as-bitmap' },
          { text: 'Container', link: '/examples/basic/container' },
          { text: 'Particle Container', link: '/examples/basic/particle-container' },
          { text: 'Simple Plane', link: '/examples/basic/simple-plane' },
        ],
      },
      {
        text: 'Sprite',
        collapsed: true,
        items: [
          { text: 'Animated Sprite Animation Speed', link: '/examples/sprite/animated-sprite-animation-speed' },
          { text: 'Animated Sprite Explosion', link: '/examples/sprite/animated-sprite-explosion' },
          { text: 'Animated Sprite Jet', link: '/examples/sprite/animated-sprite-jet' },
          { text: 'Basic', link: '/examples/sprite/basic' },
          { text: 'Texture Swap', link: '/examples/sprite/texture-swap' },
          { text: 'Tiling Sprite', link: '/examples/sprite/tiling-sprite' },
          { text: 'Video', link: '/examples/sprite/video' },
        ],
      },
      {
        text: 'Text',
        collapsed: true,
        items: [
          { text: 'Bitmap Text', link: '/examples/text/bitmap-text' },
          { text: 'From Font', link: '/examples/text/from-font' },
          { text: 'Basic', link: '/examples/text/basic' },
          { text: 'Web Font', link: '/examples/text/web-font' },
        ],
      },
      {
        text: 'Graphics',
        collapsed: true,
        items: [
          { text: 'Advanced', link: '/examples/graphics/advanced' },
          { text: 'Dynamic', link: '/examples/graphics/dynamic' },
          { text: 'Simple', link: '/examples/graphics/simple' },
        ],
      },
      {
        text: 'Events',
        collapsed: true,
        items: [
          { text: 'Click', link: '/examples/events/click' },
          { text: 'Custom Mouse Icon', link: '/examples/events/custom-mouse-icon' },
          { text: 'Dragging', link: '/examples/events/dragging' },
          { text: 'Interactivity', link: '/examples/events/interactivity' },
          { text: 'Logger', link: '/examples/events/logger' },
          { text: 'Pointer Tacker', link: '/examples/events/pointer-tracker' },
          { text: 'Slider', link: '/examples/events/slider' },
        ],
      },
      {
        text: 'Masks',
        collapsed: true,
        items: [
          { text: 'Filter', link: '/examples/masks/filter' },
          { text: 'Graphics', link: '/examples/masks/graphics' },
          { text: 'Sprite', link: '/examples/masks/sprite' },
        ],
      },
      {
        text: 'Filters Basic',
        collapsed: true,
        items: [
          { text: 'Blur', link: '/examples/filters-basic/blur' },
          { text: 'Color Matrix', link: '/examples/filters-basic/color-matrix' },
          { text: 'Displacement Map Crawlies', link: '/examples/filters-basic/displacement-map-crawlies' },
          { text: 'Displacement Map Flag', link: '/examples/filters-basic/displacement-map-flag' },
        ],
      },
      // {
      //   text: 'Filters Advanced',
      //   collapsed: true,
      //   items: [
      //     { text: 'Custom', link: '/examples/filters-advanced/custom' },
      //     { text: 'Mouse Blending', link: '/examples/filters-advanced/mouse-blending' },
      //     { text: 'Shader Toy Filter Render Texture', link: '/examples/filters-advanced/shader-toy-filter-render-texture' },
      //   ],
      // },
      /*    {
        text: 'Advanced',
        collapsed: true,
        items: [
          { text: 'Collision Detection', link: '/examples/advanced/collision-detection' },
          { text: 'Mouse Trail', link: '/examples/advanced/mouse-trail' },
          { text: 'Scratch Card', link: '/examples/advanced/scratch-card' },
          { text: 'Screen Shot', link: '/examples/advanced/screen-shot' },
          { text: 'Slots', link: '/examples/advanced/slots' },
          { text: 'Spinners', link: '/examples/advanced/spinners' },
          { text: 'Star Warp', link: '/examples/advanced/star-warp' },
        ],
      }, */
      /*    {
        text: 'Mesh And Shaders',
        collapsed: true,
        items: [
          { text: 'Instanced Geometry', link: '/examples/mesh-and-shaders/instanced-geometry' },
          { text: 'Interleaving Geometry', link: '/examples/mesh-and-shaders/interleaving-geometry' },
          { text: 'Merging Geometry', link: '/examples/mesh-and-shaders/merging-geometry' },
          { text: 'Multi Pass Shader Generated Mesh', link: '/examples/mesh-and-shaders/multi-pass-shader-generated-mesh' },
          { text: 'Shader Toy Mesh', link: '/examples/mesh-and-shaders/shader-toy-mesh' },
          { text: 'Shared Shader', link: '/examples/mesh-and-shaders/shared-shader' },
          { text: 'Sharing Geometry', link: '/examples/mesh-and-shaders/sharing-geometry' },
          { text: 'Textured Mesh Advanced', link: '/examples/mesh-and-shaders/textured-mesh-advanced' },
          { text: 'Textured Mesh Basic', link: '/examples/mesh-and-shaders/textured-mesh-basic' },
          { text: 'Triangle Color', link: '/examples/mesh-and-shaders/triangle-color' },
          { text: 'Triangle Textured', link: '/examples/mesh-and-shaders/triangle-textured' },
          { text: 'Triangle', link: '/examples/mesh-and-shaders/triangle' },
          { text: 'Uniforms', link: '/examples/mesh-and-shaders/uniforms' },
        ],
      }, */
    ],
  },

  socialLinks: [
    { icon: 'github', link: 'https://github.com/hairyf/vue3-pixi' },
  ],
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue3 Pixi',
  description: 'Vue Renderer for PixiJS',

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'author', content: 'Hairyf' }],
  ],

  themeConfig,

  markdown: {
    config: md => md.use(mdPlugin),
  },
  vite: {
    plugins: [unocss() as any],
    ssr: { noExternal: ['naive-ui', 'gsap'] },
    resolve: {
      alias: [
        {
          find: /^.*\/VPSwitchAppearance\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/VPSwitchAppearance/index.vue', import.meta.url)),
        },
      ],
    },
  },

  vue: {
    template: { compilerOptions, transformAssetUrls },
  },
})
