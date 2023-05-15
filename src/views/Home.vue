<template>
    <div class="home">
        <router-link to="/search">
            <div class="search">
                <div class="search_con">
                    <img src="@/assets/search.png" alt="" />
                    <span>400000+ 免费模板任你搜索</span>
                </div>
            </div>
        </router-link>

        <div class="scene">
            <router-link
                :to="`/sceneDetails?kindId=${s.designKindId}`"
                v-for="s in scene"
                :key="s.designKindId"
            >
                <img :src="s.thumbUrl" alt="" />
                <p>{{ s.name }}</p>
            </router-link>
        </div>
        <div style="height: 5px; background: rgb(247, 249, 251)"></div>

        <div class="theme">
            <h2 class="title">推荐专题</h2>
            <div class="theme_scroll">
                <div class="theme_item" v-for="(s, i) in solution" :key="s.id">
                    <router-link :to="`/themeDetails?themeId=${s.id}`"
                        ><p style="font-weight: 700">{{ s.title }}</p>
                        <p style="color: rgba(0, 0, 0, 0.6); font-size: 12px">
                            {{ s.themeDescribe }}
                        </p>
                        <div
                            class="colorBar"
                            :style="{ background: colors[i] }"
                        ></div
                    ></router-link>
                </div>
            </div>
        </div>
        <div class="scene-detail">
            <div class="kind" v-for="(sc, i) in sceneDetail" :key="i">
                <div class="title">
                    <h2>{{ sc.name }}</h2>
                    <router-link :to="`/sceneDetails?kindId=${sc.kindId}`"
                        >进入场景</router-link
                    >
                </div>
                <div class="templates">
                    <router-link
                        :to="`/tempDetail?templateId=${t.designTemplateId}`"
                        v-for="t in sc.templates"
                        :key="t.designTemplateId"
                    >
                        <img :src="t.designTemplateImageUrl" alt="" />
                    </router-link>
                </div>
                <div class="btns">
                    <router-link :to="`/sceneDetails?kindId=${sc.kindId}`"
                        >更多</router-link
                    >
                    <a
                        href="javascript:void(0)"
                        @click="change(sc.kindId, sc.pageNo)"
                        >换一批</a
                    >
                </div>
            </div>
            <div v-if="isload" class="loading">正在加载....</div>
            <div v-if="end" class="loading">没有更多了</div>
        </div>
        <CKT_GoTop v-if="top > 100"></CKT_GoTop>
    </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
export default {
    data() {
        return {
            scene: [],
            sceneDetail: [],
            // 推荐专题
            solution: [],
            colors: [
                "#ff406c",
                "#ffc11b",
                "#00cb47",
                "#c86efd",
                "#3ba9ff",
                "#ff406c",
            ],
            flag: true,
            pageNum: 1,
            end: false,
            isload: false,
            top: 0,
        };
    },
    mounted() {
        window.addEventListener("scroll", this.ScrollBottom);
        this.solutionSubject();
        this.getMainMiniProgramHomeInfo();
        // 朋友圈
        // this.getSceneDetail();
    },
    methods: {
        async solutionSubject() {
            let url = `/v2/solutionSubject/theme.do?_dataType=json&_dataClientType=3&client_type=40&solutionSubjectId=1&pageNum=1&pageSize=6&templatePageSize=6&type=3&device=2&business_type=1%2C2%2C3`;
            let result = await axios.get(url);
            console.log(result.data.body.data.themes);
            this.solution = result.data.body.data.themes;
        },
        async getMainMiniProgramHomeInfo() {
            let url = `/v2/mobile/main/getMainMiniProgramHomeInfo.do?_dataType=json&_dataClientType=3&client_type=40&business_type=1,2,3`;
            let result = await axios.get(url);
            console.log(result.data.body.data);
            let data = result.data.body.data;
            this.scene = _.slice(data.scene, 0, 8);

            let sceneDetail = data.sceneDetails.sceneDetail;
            for (const sc of sceneDetail) {
                sc.pageNo = 1;
            }

            this.sceneDetail = sceneDetail;
        },
        change(kindId, pageNo) {
            pageNo++;
            if (pageNo > 20) {
                pageNo = 1;
            }
            let url = `https://pub-cdn-oss.chuangkit.com/cache/today_recommend_template_v2/today_recommend_mobile_v2_${kindId}_6_${pageNo}?v=1683340291000&client_type=40&_dataClientType=3`;
            axios.get(url).then((res) => {
                // console.log(res);

                // this.sceneDetail = res.data.body.templates;

                this.sceneDetail.forEach((item) => {
                    if (kindId == item.kindId) {
                        item.pageNo = pageNo;
                        // item.pageNo++;
                        // if (item.pageNo > 20) {
                        //     item.pageNo = 1;
                        // }
                        // console.log(item.pageNo);
                        item.templates = res.data.body.templates;
                        // console.log(this.sceneDetail);
                    }
                });

                // 重新更改this.sceneDetail中的pageNo
            });
        },
        ScrollBottom() {
            const scrollTop = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.clientHeight;
            const scrollHeight = document.documentElement.scrollHeight;
            this.top = scrollTop;
            if (scrollTop + windowHeight + 5 >= scrollHeight) {
                if (this.flag) {
                    this.flag = false;
                    this.isload = true;
                    this.pageNum++;
                    let url = `/v2/mobile/main/getSceneDetail.do?_dataType=json&_dataClientType=3&client_type=40&page_no=${this.pageNum}&business_type=1,2,3`;
                    axios
                        .get(url)
                        .then((res) => {
                            // console.log(res.data);
                            if (res.data.body.data.sceneDetail) {
                                for (const sc of res.data.body.data
                                    .sceneDetail) {
                                    sc.pageNo = 1;
                                }
                                this.sceneDetail = [
                                    ...this.sceneDetail,
                                    ...res.data.body.data.sceneDetail,
                                ];
                                this.flag = true;
                                this.isload = false;
                            } else {
                                this.flag = false;
                                this.isload = false;
                                this.end = true;
                            }
                        })
                        .catch((err) => {
                            // console.log(err);
                            this.pageNum = this.pageNum - 1;
                            this.flag = true;
                        })
                        .finally(() => {
                            this.isload = false;
                        });
                }
            }
        },
    },
};
</script>

<style scoped lang="scss">
.home {
    position: relative;
    padding: 0 0 100px 0;

    .search {
        z-index: 99;
        position: sticky;
        top: 0;
        width: 100%;
        height: 57px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;

        .search_con {
            width: 366px;
            height: 36px;
            margin: 0 auto;
            background: #f8f8fb;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 20px;
            font-size: 14px;

            img {
                width: 15px;
                height: 15px;
                margin-right: 10px;
            }
        }
    }
    .scene {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        a {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 25%;
            margin: 15px 0;

            img {
                width: 55px;
                height: 55px;
                margin-bottom: 10px;
            }
        }
    }

    .theme {
        margin-top: 30px;
        // border: 1px solid red;
        padding: 0 10px;
        .theme_scroll {
            margin: 30px 0 0 0;
            overflow: auto;
            display: flex;
            height: 80px;

            .theme_item {
                position: relative;
                min-width: 125px;
                margin-right: 15px;
                padding: 10px 25px 0 15px;
                height: 68px;
                font-size: 15px;
                white-space: nowrap;
                box-shadow: 0 0.17067rem 0.768rem 0 rgba(20, 38, 86, 0.1);
                overflow: hidden;

                p {
                    margin: 5px 0;
                }

                .colorBar {
                    // background: #ff406c;
                    width: 52px;
                    height: 52px;
                    border-radius: 50%;
                    position: absolute;
                    bottom: -25px;
                    right: -25px;
                }
            }
        }
    }

    .scene-detail {
        padding: 0 10px;

        .kind {
            margin: 50px 0;

            .title {
                display: flex;
                justify-content: space-between;
            }

            .templates {
                margin: 15px 0;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;

                a {
                    margin: 5px 0;
                    display: flex;
                    width: 31.5%;
                    border: 0.02133rem solid #e6e6e6;
                    border-radius: 5px;
                    overflow: hidden;

                    img {
                        width: 100%;
                    }
                }
            }

            .btns {
                display: flex;
                justify-content: space-between;

                a {
                    width: 178px;
                    line-height: 42px;
                    text-align: center;
                    background: #f3f4f9;
                    border-radius: 20px;
                }
            }
        }
    }

    .loading {
        text-align: center;
    }
}
</style>
