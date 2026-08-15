import axios from "axios";

const productCardApi = axios.create({
    baseURL: "https://deserts-store.b.goit.study/api-docs/",
})

export async function getProduct (id) {
    const response = await productCardApi.get(`/product/${id}`)

    return response.data
}