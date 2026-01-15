// https://vitepress.dev/guide/custom-theme
import {  h } from 'vue'
import {type Theme, useData, useRoute} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import OfficialChannels from './components/OfficialChannels.vue'


export default {
    extends: DefaultTheme,

    Layout: () => {

        /**
         * If you have any ideas - release commented code and write your layout for the main page
         */

        /**
         *         const route = useRoute()
         *         if(route.path === baseRoutePath){
         *             return h(HomeLayout)
         *         }
         */

        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        })
    },
    enhanceApp({ app }) {
        app.component('OfficialChannels', OfficialChannels)
    }
} satisfies Theme