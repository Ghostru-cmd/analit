<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from 'vue'
import { Table } from 'ant-design-vue'
import { projectTableColumns } from '../constants'
import Api from '../api/api.ts'
import { ProjectTable } from '../interfaces'

const app = getCurrentInstance()?.appContext?.app
if (app) app.use(Table)

const data = ref<ProjectTable[]>([])
const api = new Api('')

onMounted(async () => {
  const projects = await api.getProjects()
  projects.forEach(project => data.value.push(project.dataForTable))
  console.log(data.value)
  console.log(projectTableColumns)
})
</script>

<template>
  <ATable :columns="projectTableColumns" :data-source="data" size="small">
  </ATable>
</template>

<style scoped>

</style>