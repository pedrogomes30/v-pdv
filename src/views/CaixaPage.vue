.<template>
  <v-app :style="{'margin-left':sidebarWidth}">

  <n-main>
   <ResumoVenda/>
  </n-main>
</v-app>
</template>

<script>
import ResumoVenda from '../components/ResumoVenda'
import {collapsed, toggleSidebar } from '../components/sidebar/state'
export default {
    components: {
        
        ResumoVenda
    },
    setup(){
      return {collapsed, toggleSidebar}
    },
    
}
</script>

<style>

</style>