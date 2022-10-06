<template>
<div class='basePage'>
  <!-- cabeçalho -->
  <v-row no-gutters dense style='max-height:20%'>
    <v-col cols="auto" align-self="center" >
      <v-list-item>
        <v-list-item-avatar rouded color="var(--primary">
          <v-icon color="white"> fa fa-newspaper</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <h1 class="white--text">NOVIDADES</h1>
        </v-list-item-content>
      </v-list-item>
    </v-col> 
    <v-col cols="auto" align-self="center" >
    </v-col> 
  </v-row >
  <!-- body -->
  <LoadComponent :overlay="this.loading" />
  <v-row class='pa-0 ma-0 mt-3 d-flex justify-start align-start'>
    <div  class='ma-2' v-for="(eachNews,index) in news" :key="index" >
        <v-card
        class="mx-auto pa-1"
        max-width="500px"
        min-height="500px"
      >
        <v-img
          :src="eachNews.main_img_url"
          :title="eachNews.main_img_title"
          height="200px"
        ></v-img>
        <v-card-title style="min-height:100px">
          {{eachNews.title}}
        </v-card-title>
        <v-card-subtitle style="min-height:100px">
          <b>{{eachNews.resume}}</b>
        </v-card-subtitle>
        <v-card-text class="d-flex flex-row-reverse mt-0 pt-0">
              {{dateFormat(eachNews.dt_news)}} - {{eachNews.author.user_name}}
          </v-card-text>
        <v-card-actions>
          <v-btn color="var(--primary)" icon @click='newLike(eachNews)'>
          <v-icon>fa-regular fa-thumbs-up</v-icon>
          <h6 class="pl-1"> {{eachNews.reactions.length}} </h6>
          </v-btn>
          <v-btn color="var(--primary)" icon class="ml-3" @click="onlyOneDetail(true)">
          <v-icon>fa-regular fa-comments</v-icon>
          <h6 class="pl-1"> {{eachNews.coments.length}} </h6>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="onlyOneDetail(false)"
            title="mais informações"
          >
            <v-icon>{{ more ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>
  <!-- more news text -->
        <v-expand-transition>
          <div v-show="more">
            <v-divider></v-divider>
            <div class='overflow-y-auto' style="max-height: 190px;"> 
              <div v-for="(text, t_index) in eachNews.texts" :key="t_index">
                <v-card-text >
                  {{text.news_text}}
                </v-card-text>
              </div>
            </div>
            <template>
              <v-carousel   height="150px" show-arrows-on-hover hide-delimiter-background hide-delimiters >
                <v-carousel-item
                v-for="(img, i_index) in eachNews.img" :key="i_index">
                  <v-img 
                    :src="img.url"
                    :alt="img.description"
                    @click="openImg(img.url)"
                    center
                    ></v-img>
                </v-carousel-item>
                
              </v-carousel>
            </template>
  
          </div>
        </v-expand-transition>
  <!-- news coments -->
        <v-expand-transition>
          <div v-show="coments">
            <v-card-subtitle>
              <v-icon>fa-regular fa-comments</v-icon> Comentários
            </v-card-subtitle>
            <div class='overflow-y-auto' style="max-height:200px">
              <div v-for="(coment, c_index) in eachNews.coments" :key="c_index" style="max-height: 400px;">
                <v-card-text class='mb-0 mb-0' >
                  <v-icon>fa fa-quote-left</v-icon>
                    <b class='ml-3 mr-3'>{{coment.coment}}</b>
                  <v-icon>fa fa-quote-right</v-icon>
                </v-card-text>
                <v-card-text class="d-flex flex-row-reverse mt-0 pt-0">
                    {{dateFormat(coment.dt_coment)}} - {{coment.author.user_name}} - {{coment.author.store_name}}
                </v-card-text>
              </div>
            </div>
            <!-- new coment -->
            <v-textarea
            v-model="coment_cache[eachNews.id]"
            append-outer-icon="fa fa-paper-plane"
            label="novo comentário"
            outlined
            no-resize
            height="50px"
            color='var(--primary)'
            class='pa-3 d-flex justify-center align-center'
            @click:append-outer="sendComent(eachNews)"
            @keyup.native.enter="sendComent(eachNews)"
          ></v-textarea>
          </div>
        </v-expand-transition>
  
      </v-card>
      </div>
  </v-row>
  </div>
</template>

<script>
  import {getNews, saveComent, saveReaction} from '../services/api/newsApi'
  import { format } from 'date-fns'
  import LoadComponent from '@/components/SysComponents/LoadComponent.vue'
  import alert from '../services/errorHandler'
  export default {
    name: 'NewsPage',
    data:()=>({    
      news:[], 
      more:false,       
      coments:false, 
      coment_cache:[],  
      loading:false,    
    }),
    computed:{
      
    },
    components: {
    LoadComponent
},
    methods: {
      onlyOneDetail(coments){
        if(coments){
          this.coments = !this.coments
          if(this.coments) this.more = false
        }else{
          this.more = !this.more
          if(this.more) this.coments = false
        }
      },
      openImg(url){
        window.open(url,'_blank');
      },
      async newLike(eachNews){
        this.loading = true
        var new_like = {
          news:eachNews.id,
          news_reaction:'like',
        }
        await saveReaction(new_like)
        this.loading = false
        this.news =  await getNews()
        alert('success','+1 curtir')
      },
      dateFormat(dateString){
        dateString = new Date(dateString)
        return format(dateString, "dd/MM/yyyy HH:mm:ss")
      },
      async sendComent(eachNews){
        this.loading = true
        if(this.coment_cache[eachNews.id] !== ''){
          var new_coment = {
            news:eachNews.id,
            author:null,
            coment:this.coment_cache[eachNews.id],
            dt_coment:format(new Date(), "yyyy-MM-dd HH:mm:ss"),
          }
          this.coment_cache[eachNews.id] = ''
          await saveComent(new_coment)
          this.news =  await getNews()
          alert('success','comentário postado.')
        }
        this.loading = false
      }
    },
    async beforeMount(){
      this.loading = true
      this.news =  await getNews()
      this.loading = false
    }
  }
</script>
