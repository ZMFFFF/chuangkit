<template>
    <div class="mine">
        手机号<input v-model="phone" type="text" /><br />
        验证码<input type="text" /><br />
        <button @click="req(phone)">登录</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            phone: "",
        };
    },
    methods: {
        req(phone) {
            let url = `/ckt/accountcenter/tools/sendSmsCaptcha.do?_dataType=json&_dataClientType=3&phone=${phone}&client_type=40&use_type=10&rand_str=@bsW&captcha_ticket=t03zcORZQ0AQFkUeUFOpD64ZGiynyS-TDelQqcHk-I-h-sZVCxciyK-KEVOohHXPJysoVPDS4zXIwWHSFdQMoLG79w9s9etgz9BrZRVWFwzMTuX3tMQzGoi8cdATqekgKZY`;
            axios.post(url).then((res) => {
                console.log(res.data);
            });
        },
    },
};
</script>