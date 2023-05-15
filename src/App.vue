<template>
    <div id="app">
        <router-view />

        <CKT_tabbar></CKT_tabbar>
    </div>
</template>

<style lang="scss">
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
body {
    font-size: 12px;
    font-family: "Helvetica Neue", sans-serif;
}
a {
    color: #333;
    text-decoration: none;
}

ul,
li {
    list-style: none;
}
</style>
