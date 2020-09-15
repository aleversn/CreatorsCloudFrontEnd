<template>
<div class="m-group-table-container">
    <fv-details-list v-model="thisValue" :head="head" :multiSelection="true" style="width: 100%; height: 100%;" @choose-items="currentChoosen = $event" @rightclick="contextMenuItem = $event">
        <template v-slot:column_0="x">
            <p class="sec">{{x.row_index + 1}}</p>
        </template>
        <template v-slot:column_1="x">
            <p>{{x.item.nickname}}</p>
        </template>
        <template v-slot:column_2="x">
            <p class="sec">{{x.item.uid}}</p>
        </template>
        <template v-slot:column_3="x">
            <p class="sec">{{x.item.email}}</p>
        </template>
        <template v-slot:column_4="x">
            <p class="sec">{{x.item.phone}}</p>
        </template>
        <template v-slot:menu>
            <div>
                <span @click="show.addUser = true">
                    <i class="ms-Icon ms-Icon--AddGroup" style="color: rgba(0, 153, 204, 1);"></i>
                    <p>管理组</p>
                </span>
            </div>
        </template>
    </fv-details-list>
</div>
</template>

<script>
export default {
    props: {
        value: {
            default: () => []
        }
    },
    data () {
        return {
            head: [
                {
                    content: "序号",
                    minWidth: 60,
                    width: 80
                },
                {
                    content: "昵称",
                    minWidth: 120,
                    width: 150,
                    sortName: "nickname"
                },
                {
                    content: "Uid",
                    minWidth: 120,
                    width: 150,
                    sortName: "uid"
                },
                {
                    content: "Email",
                    minWidth: 80,
                    width: 150,
                    sortName: "name"
                },
                {
                    content: "手机号",
                    minWidth: 120,
                    width: 120,
                    sortName: "phone"
                }
            ],
            thisValue: this.value,
            currentChoosen: [],
            contextMenuItem: {}
        }
    },
    watch: {
        value (val) {
            this.thisValue = val;
        },
        thisValue (val) {
            this.$emit('input', val);
        },
        currentChoosen (val) {
            this.$emit('choose-items', val);
        },
        contextMenuItem (val) {
            this.$emit('rightclick', val);
        }
    }
}
</script>

<style lang="scss">
.m-group-table-container
{
    @include fabric-table;
}
</style>