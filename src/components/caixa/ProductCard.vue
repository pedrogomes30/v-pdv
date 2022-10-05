<template>
    <div>
        <LoadComponent :overlay='loading' />
        <!-- products -->
        <v-card elevation="0" id="productCard" >
            <v-card-title>
                <v-list-item-avatar rouded color="var(--primary">
                    <v-icon color="white"> fa fa-boxes</v-icon>
                </v-list-item-avatar>
                Produtos
                <v-spacer></v-spacer>
                <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="procurar..."
                single-line
                dense
                autofocus
                @keyup.enter="searchProduct(search)">
                ></v-text-field>
                <v-btn 
                    icon 
                    title="Atualizar Produtos" 
                    right
                    center
                    fab
                    outlined
                    small
                    color='green'
                    class='ma-3'
                    @click="updateproducts(true)">
                    <v-icon >fa-solid fa-arrows-rotate</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-data-table   
                    :items="products"
                    :search="search" 
                    :headers="header"
                    fixed-header
                    calculate-widths
                    dense                
                    :items-per-page="50"
                    style="height: 76vh;"
                    class="overflow-y-auto"
                    >
                    <template  v-slot:item="row" >
                        <tr  @click='newItem(row.item)'>
                            <td>
                                <v-icon 
                                    size="20" 
                                    title='Enviar apra o carrinho'
                                    color="var(--primary)">
                                        fa fa-cart-plus 
                                </v-icon>
                            </td>
                            <td class=''>{{row.item.sku}}<br><b>{{row.item.description}}</b></td>
                            <td class=''>
                                <h5>{{row.item.provider.toLowerCase()}}</h5>
                                <h4>{{nameCategory(row.item.category)}}</h4>
                            </td>
                            <td >
                                <h3>
                                    {{valueFormat(row.item.price)}}
                                </h3>
                            </td>
                            <td>
                                <PriceReport :item="row.item"/>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import {getProducts} from '../../services/api/productsApi'
import LoadComponent from '../SysComponents/LoadComponent';
import PriceReport from './PriceReport';
export default {
    name: "ProductsCard",
    computed: {
        products() {
            return this.$store.state.productStore.products;
        },
        categorys() {
            return this.$store.state.productStore.categorys;
        },
    },
    data: () => {
        return {
            search: "",
            loading: false,
            report:false,
            header: [
                { text: "", align: "center", sortable: false, value: "" },
                { text: "Sku / Descricao", align: "start", value: "description" },
                { text: "Categoria / Fornecedor", align: "start", value: "provider" },
                { text: "Preco(R$)", align: "center", value: "price" },
                { text: "", align: "center", value: "" },
            ],
        };
    },
    methods: {
        newItem(item) {
            this.$store.dispatch("addItem", item);
        },
        searchProduct(search) {
            let exists = this.products.findIndex(x => x.sku === search);
            if (exists !== -1) {
                search = this.products[exists];
                this.$store.dispatch("addItem", search);
                this.search = "";
            }
        },
        valueFormat(value) {
            return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
        },
        nameCategory(categoria) {
            let exists = this.categorys.findIndex(x => x.id === categoria);
            return this.categorys[exists].name;
        },
        colorCategory(categoria) {
            let exists = this.categorys.findIndex(x => x.id === categoria);
            return this.categorys[exists].color;
        },
        async updateproducts(update) {
            try {
                if (this.products.length <= 0 || update) {
                    this.loading = true;
                    var newProducts = await getProducts();
                    console.log("PRODUTOS", newProducts);
                    this.$store.dispatch("updateProducts", newProducts);
                    this.loading = false;
                }
            }
            catch (e) {
                alert(e);
            }
        }
    },
    async beforeMount() {
        this.updateproducts(false);
    },
    components: { LoadComponent, PriceReport }
}

</script>

<style>
#productCard{
    min-width: 100%;
}
</style>