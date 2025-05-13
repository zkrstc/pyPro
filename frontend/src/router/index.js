// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import RequirementPage from '@/components/RequirementPage.vue' // 根据实际路径调整
import ArchitecturePage from '@/components/ArchitecturePage.vue'
import CodegenPage from '@/components/CodegenPage.vue'
import Home from '@/components/Home.vue'

const routes = [
    {
        path: '/requirement',
        name: 'requirement',
        component: () => import('@/components/RequirementPage.vue')
    },
    {
        path: '/',
        name: 'home',
        component: () => import('@/components/Home.vue')
    },
    {
        path: '/architecture',
        name: 'architecture',
        component: ArchitecturePage
    },
    {
        path: '/codegen',
        name: 'codegen',
        component: CodegenPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
