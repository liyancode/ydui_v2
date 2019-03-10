import React from 'react';
import {Select} from "antd/lib/index";
const Option = Select.Option;
export const _WH_Config = {
    _measure_unit_options,
    _inventory_type_options,
    _en_to_cn,
    _sort_list_arr_by_last_update_at,
    _sort_list_arr_by_batch_at,
    _format_time_string_by_day,
    _format_time_string_by_minute,
    _format_number,
    _wh_record_out_status,
}

function _measure_unit_options() {
    return [
        <Option value="meter"key="meter">米</Option>,
        <Option value="kg" key="kg">千克</Option>,
        <Option value="juan"key="juan">卷</Option>,
        <Option value="jian"key="jian">件</Option>,
        <Option value="tiao"key="tiao">条</Option>,
        <Option value="pi"key="pi">匹</Option>,
        <Option value="xiang"key="xiang">箱</Option>,
        <Option value="ge"key="ge">个</Option>,
        <Option value="tong"key="ge">桶</Option>,
    ]
}

function _inventory_type_options() {
    return [
        <Option value="yuanliao"key="yuanliao">原料</Option>,
        <Option value="peibu"key="peibu">胚布</Option>,
        <Option value="chengpin"key="chengpin">成品</Option>,
        <Option value="zhuji"key="zhuji">助剂</Option>,
        <Option value="fuliao"key="fuliao">辅料</Option>,
    ]
}

function _en_to_cn(enWord){
    switch (enWord){
        case "inbound":
            return "入库"
        case "outbound":
            return "出库"
        case "update":
            return "更新"
        case "yuanliao":
            return "原料"
        case "peibu":
            return "胚布"
        case "chengpin":
            return "成品"
        case "zhuji":
            return "助剂"
        case "fuliao":
            return "辅料"
        case "meter":
            return "米"
        case "kg":
            return "千克"
        case "juan":
            return "卷"
        case "jian":
            return "件"
        case "条":
            return "条"
        case "pi":
            return "匹"
        case "xiang":
            return "箱"
        case "ge":
            return "个"
        case "tong":
            return "桶"
        case "bao":
            return "包"
        case "zhi":
            return "只"
        default:
            return enWord
    }
}

function _sort_list_arr_by_last_update_at(a, b) {
    return a.last_update_at > b.last_update_at ? 1 : -1
}

function _sort_list_arr_by_batch_at(a, b) {
    return a.batch_at > b.batch_at ? 1 : -1
}

function _format_time_string_by_day(timeStr){
    let splitStr=' ';
    if(timeStr.indexOf('T')>0){
        splitStr="T"
    }
    return timeStr.split('+')[0].replace(/(^\s*)|(\s*$)/g, "").split(splitStr)[0];
}

function _format_time_string_by_minute(timeStr){
    return timeStr.split('+')[0].replace(/(^\s*)|(\s*$)/g, "");
}

function _format_number(numberStr) {
    return new Number(numberStr).toString()
}

//--出库单状态：new新建待仓管接单，prepare备货中，wait备货完成待发货，shipped已发货，
//                                           -- received已确认收货，done完成，cancel取消，return退回，lost丢失，unknown未知
function _wh_record_out_status(status){
    switch (status){
        case "new":
            return "新增"
        case "prepare":
            return "备货中"
        case "wait":
            return "备货完成待发货"
        case "shipped":
            return "已发货"
        case "received":
            return "已确认收货"
        case "done":
            return "完成"
        case "return":
            return "退回"
        case "cancel":
            return "取消"
        case "lost":
            return "丢失"
        default:
            return "未知"
    }
}