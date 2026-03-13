import { computed, inject, onBeforeUnmount, provide, reactive, unref, watchEffect } from 'vue'

const ADMIN_PAGE_CTX = Symbol('ADMIN_PAGE_CTX')

export function provideAdminPageContext() {
  const defaults = {
    title: '',
    subtitle: '',
    breadcrumbs: [],
    actions: [],
  }

  const page = reactive({ ...defaults })

  let activeToken = 0

  function claim() {
    activeToken += 1
    return activeToken
  }

  function update(token, meta) {
    if (token !== activeToken) return

    const value = meta ?? {}
    page.title = value.title ?? defaults.title
    page.subtitle = value.subtitle ?? defaults.subtitle
    page.breadcrumbs = value.breadcrumbs ?? defaults.breadcrumbs
    page.actions = value.actions ?? defaults.actions
  }

  function release(token) {
    if (token !== activeToken) return
    update(token, defaults)
  }

  provide(ADMIN_PAGE_CTX, {
    page,
    claim,
    update,
    release,
  })

  return { page }
}

export function useAdminPage(meta) {
  const ctx = inject(ADMIN_PAGE_CTX, null)
  if (!ctx) {
    return {
      page: computed(() => ({
        title: '',
        subtitle: '',
        breadcrumbs: [],
        actions: [],
      })),
      set: () => {},
      clear: () => {},
    }
  }

  const token = ctx.claim()

  function set(nextMeta) {
    ctx.update(token, nextMeta)
  }

  function clear() {
    ctx.release(token)
  }

  if (meta !== undefined) {
    watchEffect(() => {
      const resolved = typeof meta === 'function' ? meta() : meta
      set(unref(resolved))
    })
  }

  onBeforeUnmount(clear)

  return { page: computed(() => ctx.page), set, clear }
}
