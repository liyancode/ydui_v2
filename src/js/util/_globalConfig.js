import AppHR from "../page/app/hr/appHRM"
import AppDesignM from "../page/app/designm/appDesignM"
import AppFinanceM from "../page/app/financem/appFinanceM"
import AppMarketM from "../page/app/marketm/appMarketM"
import AppProduceM from "../page/app/producem/appProduceM"
import AppPurchaseM from "../page/app/purchasem/appPurchaseM"
import AppSystemM from "../page/app/systemm/appSystemM"
import AppWarehouseM from "../page/app/warehouse/appWarehouseM"
const _globalConfig={
    _authorityComponents: {
        hr: {
            key: 'appHR',
            component: AppHR,
            iconType: 'user',
            cn:'人力资源'
        },
        marketM: {
            key: 'appMarketM',
            component: AppMarketM,
            iconType: 'global',
            cn:'销售管理'
        },
        designM: {
            key: 'appDesignM',
            component: AppDesignM,
            iconType: 'experiment',
            cn:'设计管理'
        },
        purchaseM: {
            key: 'appPurchaseM',
            component: AppPurchaseM,
            iconType: 'shopping',
            cn:'采购管理'
        },
        warehouseM: {
            key: 'appWarehouseM',
            component: AppWarehouseM,
            iconType: 'database',
            cn:'仓库管理'
        },
        produceM: {
            key: 'appProduceM',
            component: AppProduceM,
            iconType: 'fire',
            cn:'生产管理'
        },
        financeM: {
            key: 'appFinanceM',
            component: AppFinanceM,
            iconType: 'property-safety',
            cn:'财务管理'
        },
        systemM: {
            key: 'appSystemM',
            component: AppSystemM,
            iconType: 'setting',
            cn:'系统管理'
        },
    },
}

export default _globalConfig