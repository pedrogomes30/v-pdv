<template>
    <div class="discount-form-container">
        <h2>Discount Form</h2>
        <form @submit.prevent="applyDiscount">
            <div>
                <label for="discountCode">Discount Code:</label>
                <input type="text" id="discountCode" v-model="discountCode" />
            </div>
            <button type="submit">Apply Discount</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            discountCode: "",
        };
    },
    methods: {
        applyDiscount() {
            // Call API to apply discount with this.discountCode
            // Display success or error message to user
        },
    },
};
</script>

<style scoped>
.discount-form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
