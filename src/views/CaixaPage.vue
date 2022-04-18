.<template>
  <v-app :style="{'margin-left':sidebarWidth}">

  <n-main>
   <ResumoVenda/>
  </n-main>
</v-app>
</template>

<script>
import ResumoVenda from '../components/ResumoVenda'
export default {
    components: {
        
        ResumoVenda
    },
    
}
</script>

<style>

</style>