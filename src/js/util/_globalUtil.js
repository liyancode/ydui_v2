const _globalUtil = {
    _pathnameToMenukey,
    _getSearchSub,
    _setSearchSub,
}
export default _globalUtil
function _pathnameToMenukey() {
    let pathname=window.location.pathname
    console.log("_pathnameToMenukey:"+pathname)
    if(pathname==="/"){
        return "home"
    }else if(pathname.indexOf("/appHR")===0){
        return "appHR"
    }else if(pathname.indexOf("/appCRM")===0){
        return "appCRM"
    }else if(pathname.indexOf("/appOrder")===0){
        return "appOrder"
    }else if(pathname.indexOf("/appWarehouse")===0){
        return "appWarehouse"
    }else{
        return "home"
    }
}

// ?sub=pagename
//return pagename
function _getSearchSub() {
    const search=window.location.search
    let result=null
    if(search&&search.indexOf("sub")>0){
        if(search.indexOf("=")>0&&search.length>5){
            result=search.split("?")[1].split("&")[0].split("=")[1]
        }
    }
    return result
}

function _setSearchSub(sub) {
    // window.location.search="?sub="+sub
    window.history.pushState(sub, sub, "?sub="+sub);
}