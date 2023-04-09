<template>
  <q-page padding>
    <q-table
      flat bordered
      title="Artigos"
      :rows="posts"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top>
        <span class="text-h4">Artigos</span>
        <q-space></q-space>
        <q-btn color="primary" label="Novo" :to="{ name: 'formPost' }" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="edit" color="info" dense size="sm" @click="handleEditPost(props.row.id)"/>
          <q-btn icon="delete" color="negative" dense size="sm" @click="handleDeletePost(props.row.id)"/>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import postsServices from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const posts = ref([])
    const { list, remove } = postsServices()
    const columns = [
      { name: 'id', label: 'id', field: 'id', sortable: true, align: 'left' },
      { name: 'title', label: 'Título', field: 'title', sortable: true, align: 'left' },
      { name: 'author', label: 'autor', field: 'author', sortable: true, align: 'left' },
      { name: 'actions', label: 'Ações', field: 'actions', align: 'right' }
    ]

    const $q = useQuasar()
    const router = useRouter()

    onMounted(() => {
      getPosts()
    })

    const getPosts = async () => {
      try {
        const data = await list()
        posts.value = data
      } catch (error) {
        console.error(error)
      }
    }

    const handleDeletePost = async (id) => {
      try {
        $q.dialog({
          title: 'Remover',
          message: 'Deseja remover este arquivo?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id)
          $q.notify({ message: 'Apagado com Sucesso!', icon: 'check', color: 'positive' })
          await getPosts()
        })
      } catch (error) {
        $q.notify({ message: 'Erro ao apagar!', icon: 'times', color: 'negative' })
      }
    }

    const handleEditPost = async (id) => {
      router.push({ name: 'formPost', params: { id } })
    }
    return {
      posts,
      columns,
      handleDeletePost,
      handleEditPost
    }
  }
})
</script>
