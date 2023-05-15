<template>
    <div class="theme-details">
        <div class="theme" v-for="t in theme" :key="t.id">
            <div class="title">{{ t.title }}</div>
            <div class="de_to">
                <router-link
                    :class="{ b: p.height != 1080 + 'px' }"
                    :to="`/tempDetail?templateId=${p.designTemplateId}`"
                    v-for="(p, i) in t.templates"
                    :key="i"
                    ><img :src="p.previewUrl" alt=""
                /></router-link>
            </div>
            <div class="theme-btn" @click="themeBtn(t.id, t.pageNum)">
                查看更多
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            theme: [],
        };
    },
    created() {
        // console.log(this.$route.query.themeId);
        this.getTemplate(this.$route.query.themeId);
    },
    methods: {
        async getTemplate(themeId) {
            let url = `/v2/solutionSubject/themeDetail.do?_dataType=json&_dataClientType=3&client_type=40&themeId=${themeId}&templatePageSize=6&pageNum=1`;
            let res = await axios(url);
            // console.log(res.data.body.data.theme.themeExtends);
            for (const p of res.data.body.data.theme.themeExtends) {
                p.pageNum = 1;
            }
            this.theme = res.data.body.data.theme.themeExtends;
            console.log(this.theme);
        },
        async themeBtn(themeExtendId, pageNum) {
            pageNum++;
            // console.log(themeExtendId, pageNum);
            let url = `/v2/solutionSubject/themeExtend/template.do?_dataType=json&_dataClientType=3&client_type=40&themeExtendId=${themeExtendId}&pageSize=6&pageNum=${pageNum}`;
            let res = await axios(url);
            console.log(res.data.body.data);
            this.theme.forEach((item) => {
                if (item.id == themeExtendId) {
                    console.log(item);
                    item.pageNum = pageNum;
                    item.templates = item.templates.concat(
                        res.data.body.data.templates
                    );
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.theme-details {
    .theme {
        .title {
            text-align: center;
            margin: 10px 0 30px 0;
            font-size: 17px;
        }
        .de_to {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 0 12px;

            a {
                width: 31.5%;
                margin-bottom: 8px;
                img {
                    width: 100%;
                }
            }

            .b {
                width: 48.5%;
                margin-bottom: 8px;
                img {
                    width: 100%;
                }
            }
        }
        .theme-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 160px;
            height: 40px;
            margin: 25px auto 50px;
            color: rgba(0, 0, 0, 0.6);
            background: #f9fafd;
            border: 0.02133rem solid rgba(0, 0, 0, 0.03);
            border-radius: 20px;
            font-size: 14px;
        }
    }
}
</style>