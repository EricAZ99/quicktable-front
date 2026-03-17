<script setup>
import heroImg from '../assets/hero.png'
</script>

<template>
  <div class="relative overflow-y-auto h-[90%]  bg-orange-50">
    <div
      class="pointer-events-none absolute right-0 top-0 -z-10 h-[520px] w-[520px] translate-x-1/3 -translate-y-1/3 rounded-full bg-[#FFF1DA]"
    />

    <header class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-6">
      <div class="text-lg font-extrabold tracking-tight text-slate-900">QuickTable</div>

      <nav class="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
        <a class="hover:text-slate-900" href="#definition">Concept</a>
        <a class="hover:text-slate-900" href="#avantages">Avantages</a>
        <RouterLink class="hover:text-slate-900" to="/home">Démo</RouterLink>
        <RouterLink class="hover:text-slate-900" to="/about">About</RouterLink>
      </nav>

      <div class="hidden items-center gap-3 md:flex">
        <RouterLink class="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50" to="/login"
          >Login</RouterLink
        >
        <RouterLink
          to="/home"
          class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
        >
          Sign up
        </RouterLink>
        <button class="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">EN</button>
      </div>
    </header>

    <section>
      <div class="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-6 md:grid-cols-2 md:pt-10">
        <div>
          <p class="text-sm font-extrabold tracking-wider text-[#DF6951]">MENU DIGITAL POUR RESTAURANTS</p>

          <h1 class="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#181E4B] sm:text-5xl">
            Simplifiez,
            <span class="relative inline-block">
              profitez
              <svg
                class="absolute -bottom-2 left-0 h-3 w-full"
                viewBox="0 0 200 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 16 C 45 2, 80 2, 120 12 C 150 19, 175 18, 196 8"
                  stroke="#DF6951"
                  stroke-width="6"
                  stroke-linecap="round"
                />
              </svg>
            </span>
            <br />
            et offrez une expérience sans friction
          </h1>

          <p class="mt-6 max-w-xl text-base leading-relaxed text-slate-600">
            Un menu digital (QR code) permet de consulter la carte sur smartphone, de mettre à jour vos menus sans
            réimpression et, selon l’outil, de gérer commande et paiement.
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-4">
            <RouterLink
              to="/home"
              class="inline-flex items-center justify-center rounded-xl bg-[#F1A501] px-5 py-3 text-sm font-extrabold text-white shadow-[0_12px_28px_-16px_rgba(241,165,1,0.9)] hover:brightness-95"
            >
              Découvrir
            </RouterLink>

            <a href="#definition" class="group inline-flex items-center gap-3 text-sm font-semibold text-slate-700">
              <span
                class="grid h-11 w-11 place-items-center rounded-full bg-[#DF6951] text-white shadow-[0_10px_20px_-14px_rgba(223,105,81,0.9)] group-hover:brightness-95"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Play Demo
            </a>
          </div>
        </div>

        <div class="relative">
          <div class="pointer-events-none absolute -right-10 top-6 -z-10 h-64 w-64 rounded-full bg-[#FFE1D6] blur-2xl" />
          <div class="relative mx-auto w-full max-w-md">
            <img
              :src="heroImg"
              alt="Illustration"
              class="h-auto w-full object-contain drop-shadow-[0_30px_35px_rgba(0,0,0,0.12)]"
            />
            <div class="pointer-events-none absolute -left-10 top-10 -z-10 h-14 w-14 rotate-12 text-[#DF6951]">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M2.3 12.3 21.5 3.8c.8-.3 1.5.4 1.2 1.2l-8.5 19.2c-.3.8-1.4.8-1.7 0l-2.1-5.6-5.6-2.1c-.8-.3-.8-1.4 0-1.7Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="definition" class="mx-auto max-w-5xl px-4 py-10">
      <h2 class="text-2xl font-semibold tracking-tight text-slate-900">Menu digital de restaurant : qu’est-ce que c’est ?</h2>
      <div class="mt-4 space-y-4 text-slate-700">
        <p>
          Vous l’aurez sans doute remarqué : depuis la pandémie de Covid 19 (voire un peu avant pour certains), de
          nombreux restaurants ont remplacé leur traditionnelle carte par un menu digital.
        </p>
        <p>
          Un menu digital de restaurant, parfois appelé menu électronique, c’est un menu en ligne que l’on propose de
          consulter sur smartphone. Sur la table, plus de carte graisseuse mais un support avec un QR code, que les
          clients scannent pour avoir accès à la liste des plats/boissons.
        </p>
        <p>
          Une solution intéressante pour l’hygiène et l’organisation du service — et pas uniquement en période de Covid.
        </p>
      </div>
    </section>

    <section id="avantages" class="border-t bg-orange-100">
      <div class="mx-auto max-w-5xl px-4 py-10">
        <h2 class="text-2xl font-semibold tracking-tight text-slate-900">
          Les avantages du menu digital de restaurant avec QR code
        </h2>
        <p class="mt-4 text-slate-700">
          Au-delà du menu, certaines solutions permettent aussi de passer commande, payer (et laisser un pourboire) en
          ligne, et se connecter au logiciel de caisse.
        </p>

        <div class="mt-8 grid gap-6 md:grid-cols-2">
          <div class="rounded-2xl border bg-white p-6">
            <h3 class="text-lg font-semibold text-slate-900">Côté client</h3>
            <ul class="mt-3 list-disc space-y-2 pl-5 text-slate-700">
              <li>
                <span class="font-semibold text-slate-900">Temps d’attente :</span> fini le délai avant d’obtenir la carte.
              </li>
              <li>
                <span class="font-semibold text-slate-900">Expérience :</span> plus de fluidité, moins d’attente, plus d’autonomie.
              </li>
              <li>
                <span class="font-semibold text-slate-900">Menus évolutifs :</span> mises à jour simples selon saisons/arrivages.
              </li>
            </ul>
          </div>

          <div class="rounded-2xl border bg-white p-6">
            <h3 class="text-lg font-semibold text-slate-900">Côté serveur</h3>
            <ul class="mt-3 list-disc space-y-2 pl-5 text-slate-700">
              <li>
                <span class="font-semibold text-slate-900">Productivité :</span> moins de tâches rébarbatives, plus de conseil.
              </li>
              <li>
                <span class="font-semibold text-slate-900">Moins d’erreurs :</span> moins de transmissions orales, plus de fiabilité.
              </li>
              <li>
                <span class="font-semibold text-slate-900">Motivation :</span> un quotidien facilité, un turnover potentiellement réduit.
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-8 rounded-2xl border bg-white p-6">
          <h3 class="text-lg font-semibold text-slate-900">Personnalisation & formats</h3>
          <p class="mt-2 text-slate-700">
            Personnalisez la carte à l’image de votre restaurant et affichez-la en JPG ou PDF après scan du QR code.
            Associé à d’autres modules, cela crée un parcours client 100% dématérialisé.
          </p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-5xl px-4 py-10">
      <div class="rounded-2xl bg-slate-900 p-8 text-white">
        <h2 class="text-2xl font-semibold tracking-tight">Prêt à passer au menu digital ?</h2>
        <p class="mt-2 text-white/80">
          Trouvez un outil performant et adapté à la restauration pour simplifier la prise de commande jusqu’à
          l’encaissement.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <RouterLink
            to="/home"
            class="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            Ouvrir la démo
          </RouterLink>
          <a
            href="#avantages"
            class="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Revoir les avantages
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
