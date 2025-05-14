// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import RequirementPage from '@/components/RequirementPage.vue' // 根据实际路径调整
import ArchitecturePage from '@/components/ArchitecturePage.vue'
import CodegenPage from '@/components/CodegenPage.vue'
import Home from '@/components/Home.vue'
import ModuleGenPage from '@/components/ModuleGenPage.vue'

const routes = [
    {
        path: '/requirement',
        name: 'requirement',
        component: RequirementPage
    },
    {
        path: '/',
        name: 'home',
        component: Home
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
    },
    {
        path: '/modulegen',
        name: 'modulegen',
        component: ModuleGenPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
