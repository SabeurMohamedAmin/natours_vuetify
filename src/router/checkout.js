import StripeCheckout from '@/views/StripeCheckout.vue';
const checkoutRoutes = [
    {
        path: "/booking/checkout",
        name: "checkoutPage",
        component: StripeCheckout,
    },
    {
        path: "/booking/checkoutSuccess",
        name: "checkoutSuccessPage",
        component: ()=> import(/* webpackChunkName: "checkoutSuccessPage" */ "@/views/CheckoutSuccess.vue"),
    },
    {
        path: "/booking/checkoutCancel",
        name: "checkoutCancelPage",
        component: ()=> import(/* webpackChunkName: "checkoutCancelPage" */ "@/views/CheckoutCancel.vue"),
    }
];

export default checkoutRoutes;