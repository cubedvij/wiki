import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Кубічне Вікі",
  description: "Гайд для гри на сервері \"Кубічний Двіж\"",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/images/logo.png',
    nav: [
      { text: 'Головна', link: '/' },
    ],

    sidebar: [
      {
        text: 'Початок',
        items: [
            { text: 'Як Почати Гру', link: '/getting-started' },
            { text: 'Правила', link: '/rules' },
            { text: 'Як Приєднатися', link: '/how-join' },
            { text: 'Корисні Команди', link: '/commands' },
            { text: 'Спільнота', link: '/community' }
        ]
      },
      {
        text: 'Генерація',
        items: [
            { text: 'Генерація Світу', link: '/mods/moderner-beta' },
            { text: 'Підземелля', link: '/mods/roguelike-dungeons' },
            { text: 'Нові Загрози', link: '/mods/illager-expansion' },
        ]
      },
      {
        text: 'Їжа та Алкоголь',
        items: [
            { text: 'Кулінарія', link: '/mods/farmers-delight' },
            { text: 'Алкоголь', link: '/mods/brewery' },
            { text: 'Риболовля', link: '/mods/go-fish' }
        ]
      },
      {
        text: 'Блоки та Будівництво',
        items: [
            { text: 'Декорації', link: '/mods/decorative-blocks' },
            { text: 'Шахи', link: '/mods/polychess' }
        ]
      },
      {
        text: 'Інші Механіки',
        items: [
            { text: 'Могили', link: '/mods/graves' },
            { text: 'Рюкзаки', link: '/mods/backpacks' },
            { text: 'Лікувальне Багаття', link: '/mods/healing-campfire' },
            { text: 'Сон', link: '/mods/sleep-warp' },
            { text: 'Емоції', link: '/mods/danse' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'telegram', link: 'https://t.me/cube_dvij' },
      { icon: 'discord', link: 'https://discord.gg/TK2CwjNFqT' }
    ]
  }
})
