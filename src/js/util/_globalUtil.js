import JsBarcode from 'jsbarcode'
import html2pdf from 'html2pdf.js'

const _globalUtil = {
    _pathnameToMenukey,
    _getSearchSub,
    _setSearchSub,
    _generateBarcode,
    _saveHtmlToPDFFile,
}
export default _globalUtil
function _pathnameToMenukey() {
    let pathname=window.location.pathname
    console.log("_pathnameToMenukey:"+pathname)
    if(pathname==="/"){
        return "home"
    }else if(pathname.indexOf("/appHR")===0){
        return "appHR"
    }else if(pathname.indexOf("/appMarketM")===0){
        return "appMarketM"
    }else if(pathname.indexOf("/appDesignM")===0){
        return "appDesignM"
    }else if(pathname.indexOf("/appPurchaseM")===0){
        return "appPurchaseM"
    }else if(pathname.indexOf("/appProduceM")===0){
        return "appProduceM"
    }else if(pathname.indexOf("/appWarehouseM")===0){
        return "appWarehouseM"
    }else if(pathname.indexOf("/appFinanceM")===0){
        return "appFinanceM"
    }else if(pathname.indexOf("/appSystemM")===0){
        return "appSystemM"
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

function _generateBarcode(id,text) {
    var barcode = document.getElementById(id),
        options = {
            format:"CODE128",
            displayValue:true,
            fontSize:12,
            height:50
        };
    JsBarcode(barcode, text, options);//原生
}

function _saveHtmlToPDFFile(elementId,fileName){
    const input = document.getElementById(elementId);
    const opt = {
        margin:       0.2,
        filename:     fileName,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(input).save();
}