<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from 'vue'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons-vue'
import { Table } from 'ant-design-vue'
import { projectTableColumns } from '../constants'
import Api from '../api'
import Project from "../classes/project";
import Task from "../classes/task";

const app = getCurrentInstance()?.appContext?.app
if (app) app.use(Table)

const data = ref<Project[]>([])
const api = new Api()

onMounted(async () => {
  const projects = await api.getProjects()
  projects.forEach(project => data.value.push(project))
})
</script>

<template>
  <ATable :columns="projectTableColumns" :data-source="data" size="small">
    <template #bodyCell="{ column, record }: { column: {title: string, dataIndex: string, key: string}, record: Project | Task }">
      <template v-if="column.key === 'time'">
        {{ record.getFormatedTime }}
        <template v-if="!record.isProject">
          <PauseCircleOutlined v-if="record.isOn" @click="record.toggleOn = false" />
          <PlayCircleOutlined v-else @click="record.toggleOn = true" />
        </template>
      </template>
    </template>
  </ATable>
</template>

<style scoped>

</style>