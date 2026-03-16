/**
 * useAdminPage.js
 * Composable pour gérer le contexte de la page admin (titre, sous-titre, breadcrumbs, actions).
 * Utilise provide/inject pour partager l'état entre le layout et les vues enfants.
 */
import { computed, inject, onBeforeUnmount, provide, reactive, unref, watchEffect } from 'vue'

/** Clé Symbol utilisée pour le provide/inject du contexte de page admin */
const ADMIN_PAGE_CTX = Symbol('ADMIN_PAGE_CTX')

/**
 * À appeler dans le composant layout admin.
 * Fournit le contexte de page aux composants enfants via provide.
 * @returns {{ page: reactive }} - L'état réactif de la page
 */
export function provideAdminPageContext() {
  /** Valeurs par défaut de la page */
  const defaults = {
    title: '',
    subtitle: '',
    breadcrumbs: [],
    actions: [],
  }

  /** État réactif de la page courante */
  const page = reactive({ ...defaults })

  /** Jeton incrémental pour identifier le consommateur actif */
  let activeToken = 0

  /** Génère un nouveau jeton et le retourne */
  function claim() {
    activeToken += 1
    return activeToken
  }

  /** Met à jour la page si le jeton correspond au consommateur actif */
  function update(token, meta) {
    if (token !== activeToken) return
    const value = meta ?? {}
    page.title = value.title ?? defaults.title
    page.subtitle = value.subtitle ?? defaults.subtitle
    page.breadcrumbs = value.breadcrumbs ?? defaults.breadcrumbs
    page.actions = value.actions ?? defaults.actions
  }

  /** Réinitialise la page aux valeurs par défaut si le jeton est actif */
  function release(token) {
    if (token !== activeToken) return
    update(token, defaults)
  }

  provide(ADMIN_PAGE_CTX, { page, claim, update, release })

  return { page }
}

/**
 * À appeler dans les vues enfants pour lire ou modifier le contexte de page.
 * @param {Object|Function} [meta] - Métadonnées initiales de la page (optionnel)
 * @returns {{ page: computed, set: Function, clear: Function }}
 */
export function useAdminPage(meta) {
  const ctx = inject(ADMIN_PAGE_CTX, null)

  /** Retourne un contexte vide si aucun provider n'est trouvé */
  if (!ctx) {
    return {
      page: computed(() => ({ title: '', subtitle: '', breadcrumbs: [], actions: [] })),
      set: () => {},
      clear: () => {},
    }
  }

  /** Jeton unique pour ce consommateur */
  const token = ctx.claim()

  /** Met à jour les métadonnées de la page */
  function set(nextMeta) {
    ctx.update(token, nextMeta)
  }

  /** Réinitialise les métadonnées de la page */
  function clear() {
    ctx.release(token)
  }

  /** Observe les changements de meta et met à jour automatiquement */
  if (meta !== undefined) {
    watchEffect(() => {
      const resolved = typeof meta === 'function' ? meta() : meta
      set(unref(resolved))
    })
  }

  onBeforeUnmount(clear)

  return { page: computed(() => ctx.page), set, clear }
}
