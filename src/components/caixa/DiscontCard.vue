<template>
  <v-card >
        <v-card-title>
            <v-list-item-avatar rouded color="var(--primary">
                <v-icon color="white"> fa fa-tags</v-icon>
            </v-list-item-avatar>
            Cupons
        <v-spacer></v-spacer>
        <!-- MENU ADD -->
        <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200">
            <template v-slot:activator="{ on, attrs }">
                <v-icon
                color="green"
                dark
                v-bind="attrs"
                v-on="on"
                >fa fa-plus
                </v-icon>
            </template>
            <v-card>
                <v-list>
                <v-list-item>
                    <v-list-item-avatar rouded color="var(--primary">
                        <v-icon color="white"> fa fa-tags</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                    <v-list-item-title>Incluir Cupons</v-list-item-title>
                    </v-list-item-content> 
                </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list>
                <v-text-field
                    label="código do cupom"
                    hide-details="auto"
                    v-model="cupom.code"
                    class='pa-2'
                    color="var(--primary)"
                    @change="code_validate"
                    @focus="onFocuscode"
                    :rules="rules.validcode"
                    prepend-icon='fa fa-ticket'>                
                </v-text-field>
                <div v-if="!cupom.all_products">
                    <v-select
                        label="selecione o produto"
                        hide-details="auto"
                        item-text="sku"
                        item-value="sku"
                        color="var(--primary)"
                        v-model='cupom.sku'
                        :items="items"
                        :hint="`sku: ${cupom.sku}`"
                        prepend-icon='fa fa-box'
                        class='pa-2'
                        :rules="rules.produto"
                        persistent-hint
                        single-line
                        >
                </v-select>
                </div>
                <div class='menu'>
                    <h4 class='pa-2'>obs:<br> {{cupom.description}}</h4>
                    <h4 class='pa-2'>valor: <br>{{cupom.percent ? cupom.value+'%' : valueFormat(cupom.value)}}</h4>
                </div>
                </v-list>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="menu = false">Cancelar</v-btn>
                <v-btn color="var(--primary)" text @click="addCupom()"> salvar </v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
        <!-- FIM -->
        </v-card-title>        
        <v-data-table 
        :headers="header" 
        :items="disconts"
        hide-default-footer
        hide-default-header
        calculate-widths
        id="scroll-discont"
        style="height: 25vh;padding-left:3px;padding-right:3px"
        class="overflow-y-auto">
        <template v-slot:item="row">
            <tr>
            <td>
                <v-icon size="15" color="var(--primary)">fa fa-ticket </v-icon>
            </td>
            <td>{{row.item.code}}</td>
            <td>{{skuFormat(row.item)}}</td>
            <td>{{row.item.percent ? row.item.value+'%' : valueFormat(row.item.value)}}</td>
            <td>  
                <v-icon size="10" color="red" @click="removeCupom(row.item)" >fa fa-xmark</v-icon>
            </td>
            </tr>
        </template>
        </v-data-table>
    </v-card>
</template>

<script>
import {getCupom} from '../../services/api/cuponsApi'
export default {
    name:'CupomDescontoCard',
    computed:{
        disconts(){
            return this.$store.state.cashierStore.disconts
        },
        items(){
            return this.$store.state.cashierStore.items
        },
        prefabCupons(){
          return this.$store.state.auth.cashier_session.cupoms
        },
        
    },
    data:()=>{
        return{
            menu: false,
            cupom:{
                id: 0,
                with_client: "",
                code: "",
                description: "",
                value: 0,
                all_products: 0,
                acumulate: 1,
                percent: 1,
                quantity: 0
            }, 
            header:[
                {
                text: 'code',
                align: 'start',
                sortable: false,
                value: 'code',
                },
                { text: 'value(R$)', value: 'value' },
                { text: 'Icon', value: 'icon' },
            ],
            rules:{
                validcode:[true],
                value: [
                    val => (val || '').length > 0 || 'necessário informar o produto!'
                ],
            }
        }
    },
    methods:{
        async code_validate(code){
            //test this call
            try{
                let exists = this.prefabCupons.findIndex(x => x.code === code);  
                if(exists !== -1){
                    this.cupom = this.prefabCupons[exists]
                }else{
                    var newCupom = await getCupom(code)
                    if( typeof(newCupom)!== 'undefined'){
                        this.cupom = this.newCupom
                    }else{
                        this.rules.validCodigo = ['Cupom inválido']
                    }
                }
            }catch(e){
                alert(e)
            }
        },
        addCupom(){
            if(this.cupom.acumulate){
                let noRepeat = this.disconts.findIndex(x => x.sku === this.cupom.sku);  
                if(noRepeat !== -1){
                    this.rules.validcode = ['Cupom já incluso neste item!']
                    return false
                }
                this.$store.dispatch('addDisconts',this.cupom)
            }else{
                let noRepeat = this.disconts.findIndex(x => x.code === this.cupom.code);  
                if(noRepeat !== -1){
                    this.rules.validcode = ['cupom já incluido!']
                    return false
                }
                noRepeat = this.disconts.findIndex(x => x.acumulate === false)  
                if(noRepeat !== -1){
                    this.rules.validcode = ['já possui outro cupom não acumulativo']
                    return false
                }
                this.$store.dispatch('addDisconts',this.cupom)
            }
            this.clearCupom()
            this.menu = false
        },
        removeCupom(cupom){
            this.$store.dispatch('removeDisconts',cupom)
            if(cupom.with_client){
            this.$store.dispatch('forceCustomer',cupom.with_client)
            }
        },
        onFocuscode(){
            this.rules.validcode = [true]
            this.clearCupom();
        },
        clearCupom(){
            this.cupom={
                    id: 0,
                    with_client: "",
                    code: "",
                    description: "",
                    value: 0,
                    all_products: 0,
                    acumulate: 1,
                    percent: 1,
                    quantity: 0
                } 
        },
        isPercent(value){
            return value?'%':'R$'
        },
        valueFormat(value){
            return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        },
        skuFormat(desconto){
            if(desconto.SKU === ''){
                return 'PARA TODOS OS PRODUTOS'
            }else{
                return desconto.SKU
            }
        }
    }
}
</script>

<style>

</style>