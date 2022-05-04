<template>
  <v-card height="100%">
        <v-card-title>
            <v-list-item-avatar rouded color="var(--primary">
                <v-icon color="white"> fa fa-tags</v-icon>
            </v-list-item-avatar>
            Cupons
        <v-spacer></v-spacer>
        <!-- add -->
        <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        >
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
                <h4 class='pa-2'>valor: <br>{{cupom.porcentagem ? cupom.valor+'%' : 'R$'+valueFormat(cupom.valor)}}</h4>
            </div>
            </v-list>

            <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                text
                @click="menu = false"
            >
                Cancelar
            </v-btn>
            <v-btn
                color="var(--primary)"
                text
                @click="addCupom()"
            >
                salvar
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
        <!-- subtitle -->
        </v-card-title>
        <v-card-subtitle>
            <v-icon size='20' class='pa-1' color="var(--primary)">fa fa-equals</v-icon>
            Total R${{valorProdutos}}
        </v-card-subtitle>
        <v-data-table 
        :headers="header" 
        :items="descontos"
        hide-default-footer
        hide-default-header
        calculate-widths
        id="scroll-discont"
        style="max-height: 55vh;min-height: 55vh; "
        class="overflow-y-auto"
        >
        <template v-slot:item="row">
            <tr>
            <td>{{row.item.codigo}}</td>
            <td>{{row.item.SKU}}</td>
            <td>{{row.item.porcentagem ? row.item.valor+'%' : 'R$'+valueFormat(row.item.valor)}}</td>
            <td>  
                <v-icon size="10" color="red" @click="itensSelecionados(row.item)" >fa fa-xmark</v-icon>
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
        cuponsPreDefinidos(){
          return this.$store.state.descontos.cuponsPreDefinidos
        },
        itensSelecionados(){
          return this.$store.state.caixa.itensSelecionados
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
            this.$store.dispatch('addDescontos',this.cupom)

        },
        onFocusCodigo(){
            this.rules.validCodigo = [true]
            this.cupom={
                    id:0,
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
    }
}
</script>

<style>

</style>