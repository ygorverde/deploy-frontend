<template>
  <div class="category-admin">
      <b-form>
          <input id="category-id" type="hidden" v-model="category.id" />
          <b-row>
              <b-col md="4" xs="12">
                  <b-form-group label="Nome:" label-for="category-name">
                      <b-form-input id="category-name" type="text" size="sm"
                      v-model="category.name" required
                      :readonly="mode === 'remove'"
                      placeholder="Informe o Nome"
                      ></b-form-input>
                  </b-form-group>
              </b-col>
              <b-col v-show="mode === 'save'" md="8" xs="12">
                  <b-form-group label="Categoria Pai:" label-for="category-parentId">
                     <b-form-select id="category-parentId" size="sm"
                       :options="categories" v-model="category.parentId" />
                  </b-form-group>
              </b-col>
          </b-row>
         <b-row>
            <b-col xs="12">
                <b-button variant="primary" v-if="mode === 'save'"
                @click="save">Salvar</b-button> 
                <b-button variant="danger" v-if="mode === 'remove'"
                @click="remove">Excluir</b-button>
                <b-button class="ml-2" @click="reset">Cancelar</b-button>
            </b-col>
        </b-row>
          <hr class="mt-1">
      </b-form>
      <b-table hover striped :items="categories" :fields="fields" small>
          <template slot="actions" slot-scope="data">
              <b-button variant="warning" @click="loadCategory(data.item)" class="mr-2" size="sm">
                  <i class="fa fa-pencil"></i>
              </b-button>
              <b-button variant="danger" @click="loadCategory(data.item, 'remove')" size="sm">
                  <i class="fa fa-trash"></i>
              </b-button>
          </template>
      </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'CategoryAdmin',
    data: function() { // Atributo data aponta para uma função que retorna um objeto.
        return {
            mode: 'save',
            category: {},
            categories: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'path', label: 'Caminho', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {  
        loadCategories() {
            const url = `${baseApiUrl}/categories`
            axios.get(url).then(res => {
                // this.categories = res.data
                this.categories = res.data.map(category => {
                  return { ...category, value: category.id, text: category.path }
                })
            })
        },
        reset() {
            this.mode = 'save'
            this.category = {}
            this.loadCategories(0)
        },
        save() {
            const method = this.category.id ? 'put' : 'post'
            const id = this.category.id ? `/${this.category.id}` : ''
            axios[method](`${baseApiUrl}/categories${id}`, this.category)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.reset()
            }).catch(showError)
        },
        remove() {
            const id = this.category.id
            axios.delete(`${baseApiUrl}/categories/${id}`)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.reset()
            }).catch(showError)
        },
        loadCategory(category, mode = 'save') {
            this.mode = mode
            this.category = { 
              id: category.id,
              name: category.name,
              parentId: category.parentId
            } // Clonando objeto
             
        }
    },
    mounted() {
        this.loadCategories()
    }
}
</script>

<style>

</style>