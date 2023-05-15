<template>
    <div class="temp-details">
        <div class="currentTemplate">
            <div class="cover">
                <img :src="currentTemplate.designTemplateImageUrl" alt="" />
            </div>
            <h2 class="templateTitle">{{ currentTemplate.templateTitle }}</h2>
            <div class="kindTitle">{{ currentTemplate.kindTitle }}</div>
            <div class="message">
                图片编号为{{
                    currentTemplate.designTemplateId
                }}，该手机海报尺寸{{ currentTemplate.width }}*{{
                    currentTemplate.height
                }}。点击 "立即使用"，《{{
                    currentTemplate.templateTitle
                }}》一键生成，在线编辑图片，简单拖拉拽，秒出精美手机海报。
            </div>
            <div class="keywords">
                <router-link
                    v-for="(p, i) in keywords"
                    :key="i"
                    :to="`/search?kw=${p}`"
                >
                    <span>{{ p }}</span>
                </router-link>
            </div>
        </div>
        <div class="recommendedTemplates">
            <h2 style="margin-bottom: 20px">为你推荐</h2>
            <div class="re_cont">
                <div
                    @click="re(p.designTemplateId)"
                    class="re"
                    v-for="p in recommendedTemplates"
                    :key="p.designTemplateId"
                >
                    <img :src="p.designTemplateImageUrl" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            Content: [],
            currentTemplate: [],
            keywords: [],
            recommendedTemplates: [],
        };
    },
    created() {
        this.getCont(this.$route.query.templateId);
    },
    watch: {
        $route(a) {
            console.log(a.query.templateId);
            this.getCont(a.query.templateId);
        },
    },
    methods: {
        async getCont(id) {
            let url = `/ckt/designtemplate/getDetailCacheFileUrl.do?_dataType=json&_dataClientType=3&id=${id}`;
            let result = await axios.get(url);
            console.log(result.data);
            this.currentTemplate = result.data.body.currentTemplate;
            // console.log(this.Content);
            // console.log(this.currentTemplate.keywords);
            this.keywords = this.currentTemplate.keywords.split(" ");
            this.recommendedTemplates = result.data.body.recommendedTemplates;
        },
        re(Id) {
            this.$router.push(`/tempDetail?templateId=${Id}`);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
    },
};
</script>

<style lang="scss" scoped>
.temp-details {
    padding: 0 12px;
    .currentTemplate {
        .cover {
            width: 100%;
            height: 472px;
            margin: 0 auto;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #e3e6e9;

            img {
                width: 66%;
            }
        }

        .templateTitle {
            margin: 15px 0 10px 0;
        }

        .kindTitle {
            font-size: 16px;
            color: rgba(0, 0, 0, 0.6);
            margin: 15px 0;
        }

        .message {
            font-size: 14.5px;
            line-height: 25px;
            color: #000;
        }

        .keywords {
            margin: 20px 0;
            span {
                display: inline-block;
                height: 32px;
                line-height: 32px;
                background-color: #f3f4f9;
                padding: 0 14px;
                margin: 0 12px 12px 0;
                border-radius: 15px;
            }
        }
    }

    .recommendedTemplates {
        .re_cont {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .re {
                width: 48.5%;
                // height: 314px;
                border: 1px solid #e6e6e6;
                margin-bottom: 12px;

                img {
                    width: 100%;
                }
            }
        }
    }
}
</style>