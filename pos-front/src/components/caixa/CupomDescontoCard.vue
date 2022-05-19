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
                    v-model="cupom.codigo"
                    class='pa-2'
                    color="var(--primary)"
                    @change="cuponValidate"
                    @focus="onFocusCodigo"
                    :rules="rules.validCodigo"
                    prepend-icon='fa fa-ticket'>                
                </v-text-field>
                <div v-if="!cupom.todosProdutos">
                    <v-select
                        label="selecione o produto"
                        hide-details="auto"
                        item-text="SKU"
                        item-value="SKU"
                        color="var(--primary)"
                        v-model='cupom.SKU'
                        :items="itensSelecionados"
                        :hint="`SKU: ${cupom.SKU}`"
                        prepend-icon='fa fa-box'
                        class='pa-2'
                        :rules="rules.produto"
                        persistent-hint
                        single-line
                        >
                </v-select>
                </div>
                <div class='menu'>
                    <h4 class='pa-2'>obs:<br> {{cupom.descricao}}</h4>
                    <h4 class='pa-2'>valor: <br>{{cupom.porcentagem ? cupom.valor+'%' : valueFormat(cupom.valor)}}</h4>
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
        :items="descontos"
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
            <td>{{row.item.codigo}}</td>
            <td>{{skuFormat(row.item)}}</td>
            <td>{{row.item.porcentagem ? row.item.valor+'%' : valueFormat(row.item.valor)}}</td>
            <td>  
                <v-icon size="10" color="red" @click="removeCupom(row.item)" >fa fa-xmark</v-icon>
            </td>
            </tr>
        </template>
        </v-data-table>
    </v-card>
</template>

<script>
export default {
    name:'CupomDescontoCard',
    computed:{
        descontos(){
            return this.$store.state.caixa.descontos
        },
        valorProdutos(){
          return this.$store.state.caixa.valorProdutos
        },
        itensSelecionados(){
            return this.$store.state.caixa.itensSelecionados
        },
        valorDesconto(){
            return this.$store.state.caixa.valorDesconto
        },
        cuponsPreDefinidos(){
          return this.$store.state.descontos.cuponsPreDefinidos
        },
        comCliente(){
          return this.$store.state.caixa.comCliente
        },
    },
    data:()=>{
        return{
            menu: false,
            cupom:{
                id:0,
                SKU: '', 
                codigo: '#',
                descricao:'',
                todosProdutos:false,
                comCliente:false,
                porcentagem:false,
                acumulativo:false,
                valor:'',
            }, 
            header:[
                {
                text: 'codigo',
                align: 'start',
                sortable: false,
                value: 'codigo',
                },
                { text: 'valor(R$)', value: 'valor' },
                { text: 'Icon', value: 'icon' },
            ],
            rules:{
                validCodigo:[true],
                value: [
                    val => (val || '').length > 0 || 'necessário informar o produto!'
                ],
            }
        }
    },
    methods:{
        cuponValidate(codigo){
            let exists = this.cuponsPreDefinidos.findIndex(x => x.codigo === codigo);  
            if(exists !== -1){
                this.cupom = this.cuponsPreDefinidos[exists]
            }else{
                this.rules.validCodigo = ['Cupom inválido']
            }
        },
        addCupom(){
            if(this.cupom.acumulativo){
                let noRepeat = this.descontos.findIndex(x => x.SKU === this.cupom.SKU);  
                if(noRepeat !== -1){
                    this.rules.validCodigo = ['Cupom já incluso neste item!']
                    return false
                }
                this.$store.dispatch('addDescontos',this.cupom)
            }else{
                let noRepeat = this.descontos.findIndex(x => x.codigo === this.cupom.codigo);  
                if(noRepeat !== -1){
                    this.rules.validCodigo = ['cupom já incluido!']
                    return false
                }
                noRepeat = this.descontos.findIndex(x => x.acumulativo === false)  
                if(noRepeat !== -1){
                    this.rules.validCodigo = ['já possui outro cupom não acumulativo']
                    return false
                }
                this.$store.dispatch('addDescontos',this.cupom)
            }
            this.clearCupom()
            this.menu = false
        },
        removeCupom(cupom){
            this.$store.dispatch('removeDescontos',cupom)
            if(cupom.comCliente){
            this.$store.dispatch('forceCliente',cupom.comCliente)
            }
        },
        onFocusCodigo(){
            this.rules.validCodigo = [true]
            this.clearCupom();
        },
        clearCupom(){
            this.cupom={
                    id:'',
                    SKU: '', 
                    descricao:'#',
                    todosProdutos:false,
                    comCliente:false,
                    porcentagem:false,
                    acumulativo:false,
                    valor:'',
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