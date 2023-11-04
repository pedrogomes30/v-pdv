<template>
  <div>
    <div class="card ">
      <div class="card-body row">
        <div class='col-auto d-flex align-items-center'>
            <i class="bi bi-person-circle per-icon "></i>
        </div>
        <div class='col'>
            <h5 class="card-title">
            Vendedor
            </h5>
            <p class="card-text">
            <strong>Nome do Vendedor:</strong> {{ vendedor.nome }}
            </p>
            <p class="card-text">
            <strong>CPF do Vendedor:</strong> {{ vendedor.cpf }}
            </p>
        </div>
      </div>
    </div>

    <div class="card">
        <div class="card-body row">
            <div class='col-auto d-flex align-items-center'>
                <i class="bi bi-person-circle per-icon "></i>
            </div>
                <div class='col'>
                    <h5 class="card-title">
                        Cliente
                    </h5>
                    <p class="card-text">
                        <strong>Nome do Cliente:</strong> {{ cliente.nome }}
                    </p>
                    <p class="card-text">
                        <strong>CPF:</strong> {{ vendedor.cpf }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CustomerSellerList',
  data() {
    return {
      vendedor: {
        nome: 'Nome do Vendedor',
        cpf: 'CPF do Vendedor',
      },
      cliente: {
        nome: 'Nome do Cliente',
        cpf: 'CPF do Cliente',
      },
    };
  },
};
</script>

<style scoped>
.per-icon{
    font-size: 2rem;
}
</style>
