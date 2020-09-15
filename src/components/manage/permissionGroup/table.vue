<template>
<div class="m-group-table-container">
    <fv-details-list v-model="thisValue" :head="head" :multiSelection="true" style="width: 100%; height: 100%;" @choose-items="currentChoosen = $event" @rightclick="contextMenuItem = $event">
        <template v-slot:column_0="x">
            <p class="sec">{{x.row_index + 1}}</p>
        </template>
        <template v-slot:column_1="x">
            <p>{{x.item.name}}</p>
        </template>
        <template v-slot:column_2="x">
            <p class="sec">{{x.item.pgid}}</p>
        </template>
        <template v-slot:column_3="x">
            <p class="sec">{{x.item.create_date}}</p>
        </template>
        <template v-slot:column_4="x">
            <p class="sec">{{x.item.description}}</p>
        </template>
        <template v-slot:menu>
            <div>
                <span @click="$emit('revise-info', contextMenuItem)">
                    <i class="ms-Icon ms-Icon--SaveAs" style="color: rgba(0, 153, 204, 1);"></i>
                    <p>修改信息</p>
                </span>
                <span @click="$emit('delete-group', contextMenuItem)">
                    <i class="ms-Icon ms-Icon--Delete" style="color: rgba(173, 38, 45, 1);"></i>
                    <p>删除组</p>
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
                    width: 80,
                },
                {
                    content: "名称",
                    minWidth: 120,
                    width: 150,
                    sortName: "name",
                },
                {
                    content: "PGID",
                    minWidth: 120,
                    width: 150,
                    sortName: "pgid",
                },
                {
                    content: "创建日期",
                    minWidth: 80,
                    width: 150,
                    sortName: "create_date",
                },
                {
                    content: "说明",
                    minWidth: 120,
                    width: 120,
                    sortName: "description",
                },
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