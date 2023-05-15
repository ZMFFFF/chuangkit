<template>
    <div class="scene-details">
        <router-link to="/search">
            <div class="search">
                <div class="search_con">
                    <img src="@/assets/search.png" alt="" />
                    <span>400000+ 免费模板任你搜索</span>
                </div>
            </div>
        </router-link>
        <div class="scrollViewBox">
            <div v-show="more" class="conceal">
                <ul class="label_box">
                    <li :class="{ planeact: tagIds == 0 }" @click="restore()">
                        全部
                    </li>
                    <li
                        v-for="n in template"
                        :key="n.tagid"
                        @click="thirdKindId(n.tagId)"
                        :class="{ planeact: n.tagId == tagIds }"
                    >
                        {{ n.name }}
                    </li>
                </ul>
            </div>
            <div class="yin">
                <ul class="label_box">
                    <li :class="{ active: tagIds == 0 }" @click="restore()">
                        全部
                    </li>
                    <li
                        v-for="n in template"
                        :key="n.tagid"
                        @click="thirdKindId(n.tagId)"
                        :class="{ active: n.tagId == tagIds }"
                    >
                        {{ n.name }}
                    </li>
                </ul>

                <div class="taro-img" @click="mores">
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAAEgvhuhAAAABGdBTUEAALGPC/xhBQAAAmRJREFUaAXtWL1OG0EQ3jUIGxCuEnFxQ6QgEUR58ACp8wS8QirS5Q0ooeIVeAOKpKBGcC0KUqQojWNHqYxAGAk291n6rLn1rW8tLpKL2WZ2/r6Z/VjWozPmxau9vntUAFlbT92EsRDxnxQUJnTewFfuRxJOGVBwzqPiNwxKow7gJ87j4ea0pxC/0t5g782W6UgH7NCttTeMKchXG+kbJkC2k93vMsBKBXskDB9MF4iD3tV736+6MlDFwMSlQgJvIfa3/aw0Bj68Oc64A+zzS3iWX8KP2HMFE3lzGSiLeKDBmx0EJ6hfhPaYf5dKcIKNi1hzfdvLdmhXqQwoA8pADAP5i/dt9IPvj8qBZMTKJ1qGjcePsdGaR+zxTuNpHdtLNiFQhk6A48HnPDOtgATGXERAKYNPLuYg59wWgq2xx4P+1Wcm+sB/f2W/6ZMyCI6gsgKxwMifCu4XgM4FKkIdM6YSHIHyBNBjgBEXBY7AtSS9zq/QdiwwcnQpA8qAMqAMKAPKwDwxEPWz//rtXjJ8eD7Mv5luWtM4HfQuT+o8RDvZ++TM837ezI/W8uKXPz8v+lX4UY23k/TOObMiwfy5Ufpi9/LDBHOsNfeDXrZKPSQnJueywGar8Y7TNP2YqjGLVo3ujJcSOcjlJxr6UAO1qE+TUYwTAB9DHof2nNM67ZAxf4Eyhke5ecNLTfehalYu1pNa5H7WA9TZMFuciXEmUVYdAHH+dYANV2JWhpEn14saJ9C0AzAGso6GiVdL4wQLHaDOhlmr1sYJ2umkK3dPdh/66oI77Xaze/pUKgPKgDKgDNTKwD9A0Qt0cU9rhQAAAABJRU5ErkJggg==
"
                        alt=""
                    />
                </div>
            </div>

            <div class="rank_btns">
                <div
                    class="rank_item"
                    @click="form_ac(0)"
                    :class="{ active: hottest == 0 }"
                >
                    最热
                </div>
                <div
                    class="rank_item"
                    @click="form_ac(1)"
                    :class="{ active: hottest == 1 }"
                >
                    最新
                </div>
                <div
                    class="rank_item"
                    @click="form_ac(2)"
                    :class="{ active: hottest == 2 }"
                >
                    使用最多
                </div>
                <div
                    class="rank_item"
                    @click="form_ac(3)"
                    :class="{ active: hottest == 3 }"
                >
                    最多收藏
                </div>
                <div class="rank_item" @click="screen">{{ screentxt }}</div>
                <div class="taro_imgs" v-show="screenheid">
                    <div
                        class="rank_item"
                        @click="disc_ac(0)"
                        :class="{ arrow_icon: discounts == 0 }"
                    >
                        全部
                    </div>
                    <div
                        class="rank_item"
                        @click="disc_ac(2)"
                        :class="{ arrow_icon: discounts == 2 }"
                    >
                        免费
                    </div>
                    <div
                        class="rank_item"
                        @click="disc_ac(3)"
                        :class="{ arrow_icon: discounts == 3 }"
                    >
                        付费
                    </div>
                </div>
            </div>
        </div>

        <div class="theme_con">
            <ul>
                <li v-for="(n, i) in imgtemplates" :key="i">
                    <router-link
                        :to="`/TempDetail?templateId=${n.designTemplateId}`"
                    >
                        <img
                            v-if="n.designTemplateThumbUrls"
                            :src="n.designTemplateThumbUrls[0]"
                            alt=""
                        />
                        <img
                            v-else-if="designTemplateThumbUrl"
                            :src="n.designTemplateImageUrl"
                            alt=""
                        />
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// icon数据
// https://pub-cdn-oss.chuangkit.com/cache/wx_app_template_cache_v2/1_2_50_447_0_0_46_0_2?v=1664321337626&client_type=40&_dataClientType=3
import axios from "axios";
export default {
    data() {
        return {
            template: [],
            imgtemplates: [],
            daid: 0,
            tagIds: 0,
            Gif: true,
            more: false,
            screentxt: "筛选",
            screenheid: false,
            hottest: 0,
            discounts: 0,
            pageNO: 1,
            even: true,
            leixings: true,
        };
    },
    created() {
        if (this.$route.query.kindId) {
            this.pageNO = 1;
            this.daid = this.$route.query.kindId;
            window.addEventListener("scroll", this.tumble);
            this.templates(this.daid);
            this.secondKindInfo(this.daid);
        } else {
            this.$router.push("/");
        }
    },
    methods: {
        // 页面加载内容
        templates(kindId) {
            this.Gif = true;
            let url = `/oss/cache/today_recommend_template_v2/today_recommend_mobile_v2_${kindId}_50_${this.pageNO}?v=1683509469000&client_type=40&_dataClientType=3`;
            axios(url)
                .then((result) => {
                    console.log(result);
                    if (this.pageNO == result.data.body.pageTotal) {
                        this.pageNO = result.data.body.pageTotal;
                        window.removeEventListener("scroll", this.tumble);
                        this.even = false;
                    }
                    this.imgtemplates = [
                        ...this.imgtemplates,
                        ...result.data.body.templates,
                    ];
                    this.Gif = false;
                    this.even = true;

                    console.log(this.pageNO);
                })
                .catch((err) => {
                    this.pageNO = this.pageNO - 1;
                    this.even = false;
                    this.Gif = false;
                });
        },
        // 名称
        async secondKindInfo(kindId) {
            let url = `/ckt/home/getDesignType.do?_dataType=json&client_type=40&second_kind_id=${kindId}&_dataClientType=3`;
            var result = await axios(url);
            console.log(result);
            let data = result.data.body.secondKindInfo.repoTag;
            console.log(data.use.length);
            console.log(data.style);
            if (data.use.length < 1) {
                this.template = data.style;
            } else {
                this.template = data.use;
            }
        },
        // 点击渲染底部数据
        thirdKindId(id) {
            let url = `/oss/cache/wx_app_template_cache_v2/1_${this.pageNO}_50_${this.daid}_0_0_${id}_${this.discounts}_${this.hottest}?v=1664369007247&client_type=40&_dataClientType=3`;
            this.canScroll();
            if (id == 0 && this.hottest == 0 && this.discounts == 0) {
                url = `/oss/cache/today_recommend_template_v2/today_recommend_mobile_v2_${this.daid}_50_${this.pageNO}?v=1683509469000&client_type=40&_dataClientType=3`;
            } else if (id == 0) {
                url = `/oss/cache/wx_app_template_cache_v2/0_${this.pageNO}_50_0_${this.daid}_0_0_${this.discounts}_${this.hottest}?v=1664369007247&client_type=40&_dataClientType=3`;
            } else if (this.daid == 34) {
                url = `/oss/cache/wx_app_template_cache_v2/1_${this.pageNO}_50_${this.daid}_0_${id}_0_${this.discounts}_${this.hottest}?v=1663198663951&client_type=40&_dataClientType=3`;
            }
            this.more = false;
            this.Gif = true;
            this.tagIds = id;
            console.log(this.pageNO);
            axios(url)
                .then((result) => {
                    let data = result.data.body.templates;
                    if (this.pageNO == result.data.body.pageTotal) {
                        this.pageNO = result.data.body.pageTotal;
                        window.removeEventListener("scroll", this.leixing);
                        this.leixings = false;
                    }

                    this.imgtemplates = [...this.imgtemplates, ...data];
                    this.Gif = false;
                    this.leixings = true;
                })
                .catch((err) => {
                    this.leixings = false;
                    this.Gif = false;
                });
        },
        // 全部数据
        restore() {
            this.tagIds = 0;
            this.templates(this.daid);
        },
        mores() {
            this.more = !this.more;
            if (this.more) {
                this.stopScroll();
            } else {
                this.canScroll();
            }
        },
        // 页面静止滚动
        stopScroll() {
            var mo = function (e) {
                e.preventDefault();
            };

            document.body.style.overflow = "hidden";

            document.addEventListener("document.body", mo, false); //禁止页面滑动
        },
        // 页面允许滚动
        canScroll() {
            var mo = function (e) {
                e.preventDefault();
            };

            document.body.style.overflow = ""; //出现滚动条

            document.removeEventListener("touchmove", mo, false);
        },
        screen() {
            this.screenheid = !this.screenheid;
            if (this.screenheid) {
                this.screentxt = "收起";
            } else {
                this.screentxt = "筛选";
            }
        },
        form_ac(ids) {
            this.pageNO = 1;
            this.hottest = ids;
            this.thirdKindId(this.tagIds);
            window.addEventListener("scroll", this.leixing);
        },
        disc_ac(ids) {
            this.pageNO = 1;
            this.discounts = ids;
            this.thirdKindId(this.tagIds);
            window.addEventListener("scroll", this.leixing);
        },
        tumble() {
            let scrollTop = document.documentElement.scrollTop;
            let windowHeight = document.documentElement.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight;
            if (scrollTop + windowHeight + 10 >= scrollHeight) {
                if (this.even) {
                    this.even = false;
                    this.pageNO++;
                    this.templates(this.daid);
                }
            }
        },
        leixing() {
            let scrollTop = document.documentElement.scrollTop;
            let windowHeight = document.documentElement.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight;
            if (scrollTop + windowHeight + 10 >= scrollHeight) {
                if (this.leixings) {
                    this.leixings = false;
                    this.pageNO++;
                    console.log("多项", this.pageNO);
                    this.thirdKindId(this.tagIds);
                }
            }
        },
    },
};
</script>
<style scoped lang="scss">
body {
    padding: 0;
}
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
.conceal {
    box-sizing: border-box;
    position: fixed;
    background-color: #fff;
    top: 91px;
    width: 100%;

    z-index: 99;

    ul {
        display: flex;
        flex-wrap: wrap;
        padding: 5px 5px 20px 5px;

        li {
            margin-right: 22px;
            margin-top: 10px;
            width: 71px;
            background: #f3f4f9;
            border-radius: 30px;
            white-space: nowrap;
            padding: 8px 0;
            text-align: center;

            &:nth-child(4n) {
                margin-right: 0;
            }
        }

        .planeact {
            background: #0773fc;
            color: #fff;
        }
    }
}

.scrollViewBox {
    position: sticky;
    z-index: 999;
    top: 57px;
    width: 100%;
    height: 100px;
    background-color: #fff;

    .yin {
        width: 100%;
        height: 50px;
        overflow: hidden;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        padding-right: 40px;
        position: relative;

        .taro-img {
            position: absolute;
            right: 8px;
            top: 10px;

            img {
                width: 25px;
                height: 25px;
            }
        }

        .label_box {
            display: flex;
            white-space: nowrap;
            width: 100%;
            height: 50px;
            line-height: 50px;
            overflow-x: auto;

            .active {
                font-weight: 600;
                position: relative;

                &::before {
                    content: "";
                    transform: translateX(-50%);
                    position: absolute;
                    bottom: 12px;
                    left: 50%;
                    width: 0.85333rem;
                    height: 0.128rem;
                    background: #0773fc;
                }
            }

            li {
                cursor: pointer;
                margin: 0 10px;
            }
        }
    }

    .rank_btns {
        margin-top: 10px;
        display: flex;
        position: relative;

        .rank_item {
            background: #f3f4f9;
            border-radius: 30px;
            white-space: nowrap;
            height: 20px;
            padding: 15px;
            line-height: 0;
            height: 20px;
            text-align: center;
            margin-right: 10px;

            &:first-child {
                margin-left: 10px;
            }
        }

        .taro_imgs {
            position: absolute;
            top: 37px;
            width: 100%;
            background-color: #fff;
            height: 40px;
            display: flex;

            .rank_item {
                margin-top: 5px;
                width: 50px;
            }

            .arrow_icon {
                background: #0773fc;
                color: #fff;
            }
        }

        .active {
            background: #0773fc;
            color: #fff;
        }
    }
}

.theme_con {
    width: 100%;

    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;

        li {
            width: 46.5%;
            margin-bottom: 5px;

            img {
                width: 100%;
            }
        }
    }
}
</style>