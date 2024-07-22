/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { nanoid } from 'nanoid'
import { Assets } from 'pixi.js'
import type { ExtractPropTypes, PropType } from 'vue-demi'
import { defineComponent, onBeforeUnmount, ref, renderSlot, watch } from 'vue-demi'

import type { Texture, TextureOptions, UnresolvedAsset as _UnresolvedAsset } from 'pixi.js'
import type { Awaitable } from '@antfu/utils'
import { isString } from '@antfu/utils'
import { setTextureOptions } from '../../renderer'

export type ImportedAsset = { default: string }
export type UnresolvedAsset = _UnresolvedAsset & { data?: any }

export type UnresolvedAssetAwaitable = Awaitable<string | ImportedAsset | UnresolvedAsset>
export type UnresolvedAssetArray = (UnresolvedAssetAwaitable | [string, UnresolvedAssetAwaitable])[]
export type UnresolvedAssetObject = Record<string, UnresolvedAssetAwaitable>

export type UnresolvedAssets = UnresolvedAssetObject | UnresolvedAssetArray

export const loaderProps = {
  onResolved: Function as PropType<(textures: any) => void>,
  onProgress: Function as PropType<(progress: number) => void>,
  resources: {
    type: [Object, Array] as PropType<UnresolvedAssets>,
    required: true as const,
  },
  options: {
    type: Object as PropType<TextureOptions>,
    default: () => ({}),
  },
  bundleIds: String,
}

export type LoaderProps = ExtractPropTypes<typeof loaderProps>

export const Loader = defineComponent({
  props: loaderProps,
  setup(props, { slots }) {
    const loading = ref(false)
    const textures = ref<Record<string, Texture>>()
    const progress = ref(0)
    const bundle = props.bundleIds || nanoid(5)

    function onProgress(p: number) {
      progress.value = p
      props.onProgress?.(p)
    }

    async function load() {
      Assets.addBundle(bundle, await resolveAssets(props.resources))
      const _textures = await Assets.loadBundle(bundle, onProgress)
      for (const key in _textures)
        setTextureOptions(_textures[key], props.options)

      textures.value = _textures
      props.onResolved?.(_textures)
    }

    async function unload() {
      const assetMap = (Assets.resolver as any)._assetMap
      for (const key in textures.value) {
        delete assetMap[key]
        delete assetMap[`${bundle}-${key}`]
      }
      await Assets.unloadBundle(bundle)
    }

    watch(
      () => [props.resources, props.bundleIds],
      () => {
        loading.value = true
        load().finally(() => loading.value = false)
      },
      { deep: true, immediate: true },
    )

    onBeforeUnmount(unload)

    return () => {
      return loading.value
        ? renderSlot(slots, 'fallback', { progress: progress.value })
        : renderSlot(slots, 'default', { textures: textures.value })
    }
  },
})

async function parseAsset(asset: UnresolvedAssetAwaitable, alias?: string) {
  const result = await asset
  const parsed = !isString(result)
    ? (result.default || result as UnresolvedAsset)
    : result
  if (typeof parsed === 'string')
    return { alias: alias || parsed, src: parsed }
  else
    return { ...parsed, alias: alias || parsed.alias }
}

async function resolveAssets(assets: UnresolvedAssets) {
  const result: UnresolvedAsset[] = []
  const isArray = Array.isArray(assets)

  for (const key in assets) {
    let asset = (assets as any)[key]
    asset = asset.default || asset
    if (Array.isArray(asset)) {
      result.push(await parseAsset(asset[1], asset[0]))
      continue
    }
    result.push(
      isArray
        ? await parseAsset(asset)
        : await parseAsset(asset, key),
    )
  }
  return result
}

