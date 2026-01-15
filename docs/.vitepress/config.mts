import { defineConfig } from 'vitepress'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Кубічне Вікі",
  description: "Гайд для гри на сервері \"Кубічний Двіж\"",
  base: '/wiki/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
      [
        'link',
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
      ],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ],
    [
      'link',
      { href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet' }
    ]],
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
        collapsed: true,
        base: 'mods/',
        items: [
          { text: 'Генерація Світу', link: 'moderner-beta' },
          { text: 'Підземелля', link: 'roguelike-dungeons' },
          { text: 'Нові Загрози', link: 'illager-expansion' },
        ]
      },
      {
        text: 'Їжа та Алкоголь',
        collapsed: true,
        base: 'mods/',
        items: [
          { text: 'Кулінарія', link: 'farmers-delight' },
          { text: 'Алкоголь', link: 'brewery' },
          { text: 'Риболовля', link: 'go-fish' }
        ]
      },
      {
        text: 'Блоки та Будівництво',
        collapsed: true,
        base: 'mods/',
        items: [
          { text: 'Декорації', link: 'decorative-blocks' },
          { text: 'Шахи', link: 'polychess' }
        ]
      },
      {
        text: 'Інші Механіки',
        collapsed: true,
        base: 'mods/',
        items: [
          { text: 'Могили', link: 'graves' },
          { text: 'Рюкзаки', link: 'backpacks' },
          { text: 'Лікувальне Багаття', link: 'healing-campfire' },
          { text: 'Сон', link: 'sleep-warp' },
          { text: 'Емоції', link: 'danse' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'telegram', link: 'https://t.me/cube_dvij' },
      { icon: 'discord', link: 'https://discord.gg/TK2CwjNFqT' },
      { icon: 'github', link: 'https://github.com/cubedvij' }
    ]
  }
})
