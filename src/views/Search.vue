<template>
    <div class="search">
        <div class="sea_top">
            <img src="@/assets/search.png" alt="" />
            <input
                type="text"
                v-model="searchText"
                placeholder="200000+ 免费模板任你搜索"
                @keyup.enter="searchEnter()"
            />
            <p class="back" @click="back">取消</p>
        </div>
        <div class="navbar" v-if="!show">
            <span
                :class="{ nav_active: second_kind_id == 0 }"
                @click="
                    second_kind_id = 0;
                    searchEnter();
                "
                >全部</span
            >
            <span
                v-for="n in navbar"
                :key="n.kindId"
                @click="navSpan(n.kindId)"
                :class="{ nav_active: second_kind_id == n.kindId }"
                >{{ n.kindTitle }}</span
            >
        </div>
        <div class="Recommend" v-if="show">
            <div class="title">热门搜索</div>
            <span
                @click="searchClick($event)"
                v-for="r in RecommendKeyword"
                :key="r.templateCount"
                >{{ r.keyword }}</span
            >
        </div>
        <div
            class="Recommend"
            v-if="show && this.$store.state.keyword_his.length !== 0"
        >
            <div class="title">历史搜索</div>
            <span
                @click="searchClick($event)"
                v-for="(r, i) in $store.state.keyword_his"
                :key="i"
                >{{ r }}</span
            >
        </div>

        <div class="content" v-if="!show">
            <div class="title">
                <div class="con_num">{{ contNum }}个模板</div>
                <div class="order">
                    <span
                        :class="{ black: time_order == 0 }"
                        @click="
                            time_order = 0;
                            searchEnter();
                        "
                        >最热</span
                    >
                    |
                    <span
                        :class="{ black: time_order == 1 }"
                        @click="
                            time_order = 1;
                            searchEnter();
                        "
                        >最新</span
                    >
                </div>
            </div>
            <div v-if="contNum == 0" class="null">
                <img src="@/assets/null.png" alt="" />
                <p>当前分类暂无模板</p>
            </div>
            <div class="contemplate" v-else>
                <div
                    class="templateOne"
                    v-for="(g, i) in searchContent"
                    :key="i"
                >
                    <router-link
                        :to="`/tempDetail?templateId=${g.designTemplateId}`"
                    >
                        <img :src="g.previewUrl" alt="" />
                    </router-link>
                </div>
            </div>
        </div>
        <CKT_GoTop v-if="top > 100"></CKT_GoTop>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            // 建议搜索
            RecommendKeyword: [],
            // 主要内容
            searchContent: [],
            pageNo: 1,
            contNum: 0,
            searchText: "",
            time_order: 0,
            flag: true,
            top: 0,
            navbar: [],
            second_kind_id: 0,
            show: true,
        };
    },
    mounted() {
        window.addEventListener("scroll", this.ScrollBottom);
        this.getRecommendKeyword();
        // console.log(this.$route.query.kw);
        if (this.$route.query.kw) {
            this.searchText = this.$route.query.kw;
            this.searchEnter();
        }
        this.getNavbar();
    },
    methods: {
        back() {
            history.go(-1);
        },
        navSpan(kindId) {
            console.log(kindId);
            this.second_kind_id = kindId;
            this.searchEnter();
        },
        async getRecommendKeyword() {
            let url = `/v2/template/getRecommendKeyword.do?_dataType=json`;
            let result = await axios.get(url);
            // console.log(result.data);
            this.RecommendKeyword = result.data.body.data;
        },
        async getNavbar() {
            let url = `/v2/designkind/getDesignKindBasicInfo.do?_dataType=json$client_type=40&type=2&_dataClientType=3`;
            let result = await axios.get(url);
            // console.log(result.data.body.data.secondLabel);
            this.navbar = result.data.body.data.secondLabel;
        },
        async searchClick(e) {
            // console.log(e.target.innerText);
            this.searchText = e.target.innerText;
            let url = `/v2/template/wxSmallAppSearch.do?_dataType=json&kw=${this.searchText}&pageNo=${this.pageNo}&time_order=${this.time_order}&second_kind_id=${this.second_kind_id}`;
            let result = await axios.get(url);
            // console.log(result.data.body);
            this.contNum = result.data.body.totalCount;
            this.searchContent = result.data.body.templates;
            this.$store.commit("keyword_push", this.searchText);
            this.show = false;
            console.log(this.searchContent);
        },
        async searchEnter() {
            let url = `/v2/template/wxSmallAppSearch.do?_dataType=json&kw=${this.searchText}&pageNo=${this.pageNo}&time_order=${this.time_order}&second_kind_id=${this.second_kind_id}`;
            let result = await axios.get(url);
            // console.log(result.data.body);
            console.log(result.data.body.templates);
            this.contNum = result.data.body.totalCount;
            this.searchContent = result.data.body.templates;
            this.$store.commit("keyword_push", this.searchText);
            this.show = false;
        },
        ScrollBottom() {
            const scrollTop = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.clientHeight;
            const scrollHeight = document.documentElement.scrollHeight;
            this.top = scrollTop;
            if (
                scrollTop + windowHeight + 5 >= scrollHeight &&
                this.searchContent.length != 0
            ) {
                if (this.flag) {
                    this.flag = false;
                    this.pageNo++;
                    let url = `/v2/template/wxSmallAppSearch.do?_dataType=json&kw=${this.searchText}&pageNo=${this.pageNo}&time_order=${this.time_order}&second_kind_id=${this.second_kind_id}`;
                    axios.get(url).then((res) => {
                        this.searchContent = [
                            ...this.searchContent,
                            ...res.data.body.templates,
                        ];
                        this.flag = true;
                    });
                }
            }
        },
    },
};
</script>
<style scoped lang="scss">
.search {
    .black {
        color: #000;
    }

    padding: 0 10px;
    .sea_top {
        position: sticky;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 46px;
        // border: 1px solid red;
        background-color: #fff;

        img {
            position: absolute;
            left: 10px;
            width: 17px;
            height: 17px;
        }

        input {
            width: 90%;
            height: 36px;
            border-radius: 20px;
            outline: none;
            border: none;
            background-color: #f8f8fb;
            color: #777;
            padding-left: 35px;
        }
    }
    .navbar {
        overflow-x: auto;
        // border: 1px solid red;
        display: flex;
        align-items: center;
        height: 45px;
        color: #000;
        font-size: 16px;
        line-height: 45px;

        span {
            height: 100%;
            white-space: nowrap;
            // padding: 15px;
            margin-right: 20px;
        }

        .nav_active {
            border-bottom: 2px solid #0773fc;
        }
    }

    .Recommend {
        // border: 1px solid red;
        padding: 20px 0;

        .title {
            margin: 0 0 20px 0;
        }

        span {
            display: inline-block;
            height: 32px;
            line-height: 32px;
            background-color: #f3f4f9;
            color: rgba(0, 0, 0, 0.6);
            padding: 0 14px;
            margin: 0 12px 12px 0;
            border-radius: 15px;
        }
    }

    .content {
        .title {
            margin: 20px 0;
            display: flex;
            justify-content: space-between;
            .con_num {
                font-size: 18px;
            }

            .order {
                color: rgba(0, 0, 0, 0.6);
            }
        }

        .null {
            margin: 200px 0 0 0;
            text-align: center;

            img {
                width: 105px;
                height: 105px;
            }
            p {
                margin: 15px 0 0 0;
                font-size: 15px;
                color: rgba(0, 0, 0, 0.6);
            }
        }

        .contemplate {
            column-count: 2;
            .templateOne {
                overflow: hidden;
                display: inline-block;
                width: 178px;
                height: auto;

                img {
                    width: 100%;
                    height: 100%;
                    border: 1px solid #999;
                    border-radius: 5px;
                }
            }
        }
    }
}
</style>