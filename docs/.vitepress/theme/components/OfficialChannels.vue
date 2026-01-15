<script setup lang="ts">
import { ref, computed } from "vue";

</script>

<template>
  <div class="channels-page">
    <h1>📰 Офіційні посилання сервера</h1>

    <section>
      <h2>Канал сервера</h2>
      <div class="channels-list">
        <div key="telegram-channel" class="channel-card">
          <div class="image-container">
            <img src="/images/channels/telegram.jpg" alt="Телеграм канал Кубічний Двіж" />
          </div>
          <div class="channel-info">
            <h3>Кубічний Двіж</h3>
            <a :href="'https://t.me/cube_dvij'" target="_blank" rel="noopener noreferrer">
              Підписатись на канал
            </a>
            <p>Телеграм канал з останніми новинами та оновленнями сервера.</p>
            </div>
      </div>
    </div>
    </section>

    <section>
      <h2>Чат сервера</h2>
      <div class="channels-list">
        <div class="channel-card">
          <div class="image-container">
            <img src="/images/channels/telegram_chat.jpg" alt="Телеграм чат Кубічний Двіж" />
          </div>
          <div class="channel-info">
            <h3>Кубічний Двіж (чат)</h3>
            <a :href="'https://t.me/cube_dvij_chat'" target="_blank" rel="noopener noreferrer">
              Приєднатись до чату
            </a>
            <p>Чат для обговорення новин та подій сервера.</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2>Discord Сервер</h2>
      <div class="channels-list">
        <div class="channel-card">
          <div class="image-container">
            <img
              src="/images/channels/discord.webp"
              alt="Discord Сервер Кубічний Двіж"
            />
          </div>
          <div class="channel-info">
            <h3>Кубічний Двіж (Discord сервер)</h3>
            <a
              :href="'https://discord.gg/kqfr9avhuH'"
              target="_blank"
              rel="noopener noreferrer"
            >
              Приєднатись до Discord сервера
            </a>
            <p>
              Офіційний Discord сервер сервера.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.channels-page {
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

h1 {
  color: var(--vp-c-text-1);
  margin-bottom: 2rem;
}

h2 {
  color: var(--vp-c-text-2);
  border-bottom: 2px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
  margin-top: 2rem;
}

.channel-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px var(--vp-c-shadow-1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: flex-start;
}

.channel-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px var(--vp-c-shadow-2);
}

.image-container {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  margin-right: 1rem;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.channel-info {
  flex-grow: 1;
}

.channel-card h3 {
  color: var(--vp-c-text-1);
  margin: 0 0 0.25rem;
  font-size: 1.1rem;
}

.channel-card a {
  color: var(--vp-c-brand);
  text-decoration: none;
  word-break: break-all;
  font-size: 0.9rem;
}

.channel-card a:hover {
  text-decoration: underline;
}

.channel-card p {
  margin: 0.5rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

</style>