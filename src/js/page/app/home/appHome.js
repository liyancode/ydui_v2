import React from 'react';
import {Layout, Breadcrumb, Card} from 'antd';
import _globalConstrants from "../../../util/_globalConstrants"

const {Content,} = Layout;

export default class AppHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            breadcrumb: '首页',
        }
        console.log("location:" + window.location.pathname)
    }

    render() {
        return (
            <div>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={_globalConstrants._styles.contentStyle}
                ><div>
                    <Card title="国务院办公厅关于2019年部分节假日安排的通知" bordered={false}>
                        <p>国办发明电〔2018〕15号</p>


                        <p>各省、自治区、直辖市人民政府，国务院各部委、各直属机构：</p>

                        <p>经国务院批准，现将2019年元旦、春节、清明节、劳动节、端午节、中秋节和国庆节放假调休日期的具体安排通知如下。</p>

                        <p>一、元旦：2018年12月30日至2019年1月1日放假调休，共3天。2018年12月29日（星期六）上班。</p>

                        <p>二、春节：2月4日至10日放假调休，共7天。2月2日（星期六）、2月3日（星期日）上班。</p>

                        <p>三、清明节：4月5日放假，与周末连休。</p>

                        <p>四、劳动节：5月1日放假。</p>

                        <p>五、端午节：6月7日放假，与周末连休。</p>

                        <p>六、中秋节：9月13日放假，与周末连休。</p>

                        <p>七、国庆节：10月1日至7日放假调休，共7天。9月29日（星期日）、10月12日（星期六）上班。</p>

                        <p>节假日期间，各地区、各部门要妥善安排好值班和安全、保卫等工作，遇有重大突发事件，要按规定及时报告并妥善处置，确保人民群众祥和平安度过节日假期。</p>

                        <p>国务院办公厅</p>

                        <p>2018年12月4日</p>
                    </Card>
                </div>
                </Content>
            </div>)
    }
}
const PageContent = (props) => {
}