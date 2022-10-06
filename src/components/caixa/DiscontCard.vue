<template>
  <div height='100%' class="d-flex flex-column align-center justify-center">
        <v-data-table 
        :headers="header" 
        :items="disconts"
        hide-default-footer
        hide-default-header
        calculate-widths
        style="height: 27vh;width: 100%;padding-left:3px;padding-right:3px"
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
        <v-form @submit.prevent="addCupom()" style="width:100%" class='px-3 pb-6 d-flex flex-row' >
            <v-text-field
                label="código do cupom"
                hide-details="auto"
                v-model="cupom.code"
                style="max-width:45%"
                class='pa-2'
                :hint="cupom.description"
                persistent-hint
                autofocus
                color="var(--primary)"
                @change="code_validate"
                @focus="onFocuscode"
                :rules="rules.validcode"
                prepend-icon='fa fa-ticket'>                
            </v-text-field>
            <v-select
                label="selecione o produto"
                hide-details="auto"
                item-text="sku"
                item-value="sku"
                color="var(--primary)"
                :disabled="cupom.all_products !== 0"
                v-model='cupom.sku'
                :items="items"
                :hint="`sku: ${cupom.sku}`"
                prepend-icon='fa fa-box'
                style="max-width:40%"
                class='pa-2'
                :rules="rules.produto"
                persistent-hint
                single-line
                >
            </v-select>
            <v-btn
                type="submit"
                color="green"
                fab
                small
                class='ml-6 mt-3'
            ><v-icon color="white">fa fa-plus</v-icon>
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import {getCupom} from '../../services/api/cuponsApi'
import alert from '../../services/errorHandler'
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
                quantity: 0,
                sku:''
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
                        this.rules.validcode = ['Cupom inválido']
                    }
                }
            }catch(e){
               alert('error','Cupom inválido')
            }
        },
        addCupom(){
            try{
                if(this.cupom.description == '') throw new Error("sem cupom válido definido!")
                var newCupom = Object.assign({}, this.cupom) 
                if(newCupom.acumulate){
                    let noRepeat = this.disconts.findIndex(x => x.sku === this.cupom.sku);  
                    console.log(noRepeat)
                    if(noRepeat !== -1){
                        this.rules.validcode = ['Cupom já incluso neste item!']
                        return false
                    }
                    this.$store.dispatch('addDisconts',newCupom)
                    alert('success',`Cupom ${newCupom.code} adicionado ao carrinho`)
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
                    this.$store.dispatch('addDisconts',newCupom)
                    alert('success',`Cupom ${newCupom.code} adicionado ao carrinho`)
                }
                this.clearCupom()
                this.menu = false
            }catch(e){
                this.clearCupom()
                this.rules.validcode = ['já possui outro cupom não acumulativo']
            }
        },
        removeCupom(cupom){
            this.$store.dispatch('removeDisconts',cupom)
            alert('warning',`Cupom ${cupom.code} removido.`)
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
            if(desconto.sku === '' || typeof(desconto.sku) === 'undefined' ){
                return 'PARA TODOS OS PRODUTOS'
            }else{
                return desconto.sku
            }
        }
    }
}
</script>

<style>

</style>