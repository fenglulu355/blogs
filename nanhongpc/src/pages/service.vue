<template>
  <div class="service">
    <banner></banner>
    <div class="servisebox">
      <tabBar :tabinfo="tabtitle" :tabnav="tabnav" @change="tonav" :curi="curindex"></tabBar>
      <!-- show -->
      <div class="repair serv" v-show="curindex===null">
        <div class="repic">
          <div class="telinfo">
            <p class="text">销售、售后及配送集于一体的综合企业</p>
            <h1>全心全意为顾客服务</h1>
            <p class="tel">服务热线：18181878760</p>
            <a href="javascrpt:;" class="totel">立即咨询</a>
          </div>
          <img src="../assets/ser/show.png" alt />
        </div>
        <div class="reinfo">
          <p>售后服务</p>
          <section>
            一、售前
            （1）如客户需要，按客户的特殊要求，协助设计所需产品。（2）热情接待客户，迅速处理来电、来函、传真及其他咨询。
            （3）免费帮助客户培训操作、维护技术人员、帮助他们能熟练掌握技术。
            二、售中
            （1）严格按照合同技术要求及国家有关标准组织生产，保质保量，准时在约定地点交货。
            （2）当客户选型错误、订单数量不足或其他情况要求提前供货时，我公司优先安排生产，努力满足客户要求。
            三、售后
            （1）实行售后服务到位制度，即接到用户通知后，服务人员及时到位服务。（三年保修）
            （2）产品在交付前是损坏、短缺等质量问题，概有我们公司负责。
            （3）质量保质期内（2个月）存在或发生是质量问题，经双方确认后，的确是我公司责任，我们公司负责妥善处理，合理费用概由我们公司承担。
            （4）双方确认是用户责任造成的质量问题，我们公司也将协助解决，力争满足用户的合理要求。
            （5）用户设计变更，产品规格、型号数量有所变动，我们公司将积极配合，努力满足客户要求；如用户所订购是产品超过实际需要或因设计变更，原订购产品不能继续使用，我们公司部将积极配合用户做好售后处理工作，减轻用户负担。
            （6）用户在使用过程中，需要提供技术指导，我们公司将及时派出专业技术人员提供服务。
            （7)我们公司建立用户档案，在质量保证期结束后，我们公司仍将于用户联系沟通，追求尽善尽美，满足用户需要。
            （8）对非本公司制造质量造成的现场服务，我们公司将根据实际发生的差旅等费用，酌情向客户收取技术服务费。
            （9）对非本公司制造质量问题造成的损坏或质保期外的损坏，我们公司提供有偿维修服务。
            为了方便用户质量投诉，我们公司电话24小时开通。
          </section>
        </div>
      </div>
      <!-- 团队 -->
      <div class="team serv" v-show="curindex===0">
        <ul class="teamshow">
          <li
            class="ts-left"
            :style="{backgroundImage: 'url(' + require('../assets/ser/onebg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          ></li>
          <li
            class="ts-right"
            :style="{backgroundImage: 'url(' + require('../assets/ser/onebgs.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
          >
            <div class="top">
              <p>以人为本</p>
              <p>以技为魂</p>
              <p>以管理为纽带</p>
            </div>
            <p class="deshed">------------------------------------</p>
            <div class="bottom">
              <p class="deshed">------</p>
              <p>认真对待每一个用户，带领全体员工共同努</p>
              <p>力，创造南宏更美好的明天。</p>
            </div>
          </li>
        </ul>
        <ul class="teaminfo">
          <li class="teaminfoli" v-for="(item, index) in teaminfo" :key="index">
            <div
              class="pics"
              :style="{backgroundImage: 'url(' + item.img+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <p class="name">
              <span>{{item.name}}</span>
              <span>{{item.job}}</span>
            </p>
          </li>
        </ul>
        <!-- 分页 -->
        <mo-pagination
          :page-index="currentPage"
          :total="count"
          :page-size="pageSize"
          @change="pageChange"
        ></mo-pagination>
      </div>
      <!-- 服务 -->
      <div class="process serv" v-show="curindex===1">
        <div class="protop">
          <p>一站式专业服务流程</p>
          <div class="propic">
            <img src="../assets/ser/lc.png" alt />
          </div>
        </div>
        <div class="profw">
          <p>专业的安装服务</p>
          <p>南宏机电公司专业安装团队秉承“精品工程，专业耕耘”的服务原则，制定出一套完整的施工规则，严格安装国家相关规定的施工准则安装作业，交付使用，方能达到你想要的满意程度。</p>
          <div class="propic">
            <img src="../assets/ser/fw.png" alt />
          </div>
        </div>
      </div>
      <!-- 安装 -->
      <div class="install serv" v-show="curindex===2">
        <ul class="ins-list">
          <li class="ins-li" v-for="(item, index) in insli" :key="index">
            <div
              class="mainpic"
              :style="{backgroundImage: 'url(' +item.img + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
            ></div>
            <div class="ins-info">
              <p class="title">{{item.title}}</p>
              <p class="time">{{item.time}}</p>
              <p class="intro">
                <span>简介：{{item.intro}}</span>
                <span>小区：{{item.xq}}</span>
                <span>房间类型：{{item.home}}</span>
              </p>
              <p class="area">面积：{{item.area}}</p>
              <p class="more">查看详情+</p>
            </div>
          </li>
        </ul>
        <!-- 分页 -->
        <mo-pagination
          :page-index="currentPage"
          :total="count"
          :page-size="pageSize"
          @change="pageChange"
        ></mo-pagination>
      </div>
      <!-- 售后 -->
      <div class="repair serv" v-show="curindex===3">
        <div class="repic">
          <div class="telinfo">
            <p class="text">销售、售后及配送集于一体的综合企业</p>
            <h1>全心全意为顾客服务</h1>
            <p class="tel">服务热线：18181878760</p>
            <a href="javascrpt:;" class="totel">立即咨询</a>
          </div>
          <img src="../assets/ser/SH.png" alt />
        </div>
        <div class="reinfo">
          <p>工程售后维保</p>
          <section>
            一、工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
            工程售后维保内容客户稍后提供工程售后维保内容客户稍后提供
          </section>
        </div>
      </div>
      <!-- 条款 -->
      <div class="clause serv" v-show="curindex===4">
        <p class="title">服务条款</p>
        <div class="clauseinfo">
          <section>
            服务条款
            更新时间：2019-02-26 21:56:24
            项目名称: 合同来源: 合同编号: 材料名称
            买卖合同（通用版本） 买受人： （以下简称甲方） 出卖人： （以下简称乙方）
            甲、乙双方在自愿的基础上经充分协商，依照《中华人民共和国合同法》及其他有关法律法规的规定，订立本合同。
            第1条 货物的名称、品种、规格、质量和验收 1、货物的具体的名称、品种、规格型号、数量、厂家、价款以本合同书附件1所列为准。 2、货物的质量、技术标准：货物的质量满足国家或相关行业的强制性质量标准；并具有国家认可机构出具的与每批货物相对应有效期限内的有效质量检验合格报告，无强制性标准的应以样品或双方约定的标准为准（包括图纸、样品等），如标准间存在冲突，按严格的标准执行。图纸及样品必须经双方签认并妥善封存。
            第二条 货物的数量、计价方法 1、货物的数量：实际需要的货物品种、规格、数量由甲方按单个工程项目分批提供订货清单，订货清单须由甲方授权代表签字有效。乙方须按订货清单供货。 2、计价方法：按验收合格的数量乘以相应货物结算单价据实结算。 3、乙方送货到指定地点后，由甲方两名仓管、两名保安和工地主管以抽检的方式对货物的规格型号、数量和质量进行初验且签收确认。 4、乙方在交货前应向甲方提供货物相对应有效期限内的产品合格证（原件）、国家认可机构出具的产品质量检验报告（需加盖厂家公章）、产品质量说明书（或产品质量认证证书）等文件。 5、乙方同意甲方可聘请有资质的检测机构对货物随机抽样进行产品质量检验。质量检验合格，检验费用由甲方承担；质量检验不合格，检验费用由乙方承担。 6、货物名称： 。 7、供货单位：
            第三条 货物的包装标准 按国家相关标准或主管部门的规定执行，无相关标准或规定的，采用足以保护货物不受损的包装方式。 乙方需确保包装质量，在甲方收货后的保管、装卸、拆包装过程中，如因乙方包装质量缺陷而导致的货物损坏，由乙方负全责。
            第四条 货物的交货单位（或交货人）、交货方法、运输方式、到货地点
            1、交货方法及地点：乙方负责将货物运送到 甲方指定具体位置的卸货地点（汽车可到达地点）卸货，若乙方未按照甲方指定的位置（汽车可到达地点）卸货，发生的二次搬运费用由乙方负责。甲方
            初验合格收货后出具收货单。 2、交货时间：乙方应在 年 月 日前将全部货物送到交货地点并经甲方验收合格。 3、运输方式和费用负担： （1）乙方负责办理货物的运输并负责按本合同约定或甲方的书面通知确定的供货日期将货物运至甲方指定所属的位置，所涉各项运输费、装车费等均由乙方承担。 （2）乙方负责将货物送至甲方指定地点并在甲方指定具体的位置卸货，若乙方未按照甲方指定的位置卸货，发生的二次搬运费用由乙方负责。甲方初验合格收货后出具收货单。 （3）乙方在送货过程中对可能引起的路桥加固、损毁后修复、人员伤忙等承担一切责任。运输车辆改装时增加的费用由乙方自行承担。 （4）乙方在送货过程中因公安、交警、城管等执法部门规定白天不准行车或晚上城市主干道不准行车带来的不便由乙方自行协调，乙方不能要求追加任何费用，更不能据此延误工期。 （5）乙方在货物装卸、运输过程中因违反法律、法规而遭受的行政处罚或造成任何的人身伤害、财产损失与甲方无关，由乙方负责处理并负法律责任。
            第五条 货物的交货时间 甲方在本合同约定的供货期限内以传真或邮件形式向乙方发出订货清单（包括货物的规格型号、数量、送货地址、送货时间、联系人、联系电话等），乙方应自收到甲方订货清单2小时内以传真或邮件形式予以确认，并按订货清单的送货日期按时交货（送货前24小时内向甲方发出发货通知，以便甲方作好收货准备）。
            第六条 验收方法
            1、样品封存：本合同签订时，甲、乙方共同对样板进行封板，该样板由甲方保存。乙方所提供产品的颜色、规格、色泽等须与样板相符。 2、货物性能、质量的鉴定：乙方提供之货物（包括配件）的产品质量必须符合国家和行业有关规范和规定。货物的性能质量以交货地国家认可机构的质量检验部门的检验报告为准，检验费用由乙方承担。 3、货到现场时，甲乙双方授权代表共同对货物的外观、数量进行初验（具体的验收标准、方法见附件5），乙方所送货物达不到合同书和订货清单要求的或乙方未能向甲方提供货物相对应有效期限内的产品合格证（原件）、国家认可机构出具的产品质量检验报告（需加盖厂家公章）、产品质量说明书（或产品质量认证证书）等文件的甲方有权拒绝接收。 4、乙方提供完整无损的、未曾作任何用途使用的全新产品。产品应符合产品说明书所述的产品规格及质量标准。甲方所接收的货物，在拆除包装后、使用前所发现的破损或损耗，运输到甲方指定地点后在使用前发现有损坏的24小时内通知乙方进行确认，
            经确认后属乙方原因（包括运输）的，由乙方在2天内无偿更换。非乙方产品质量或运输原因造成的破损由甲方负责，货物更换前的保管费用由乙方承担。 5、甲方收货后，经检验货物性能、质量不合格的，乙方须在接到甲方书面异议后2天内负责处理，否则，即视为同意甲方提出的异议和处理意见。 6、验收时乙方须随货物提交的附件包括：国家认可机构检验的质量合格报告、合格证书、保修书、安装说明书等；货物属进口的，还须提供原产地证明、报关报检的相关资料，包括但不限于报检委托书、合同等。 7、甲方对货物的验收、认可，不免除乙方对货物质量缺陷应承担的责任。
            第七条 货物的价格与货款的结算
            1、货物的价格：按本合同附件1所列单价结算。
            2、本合同项下货物暂定造价：价税合计总额为 元(大写：人民币 元整)，其中不含税价为 元，增值税 元（乙方适用增值税税率为 %）。本合同项下货物固定单价已包含材料费、检测费、人工费、运输费（含运输损耗）、 装车费、卸车费、质保金、交货前仓储费、保险费、利润、税金、不可预见费等产品送到交货地点并经验收合格的全部费用，除此之外，甲方无需再向乙方支付任何其他费用。 3、乙方在每月 1-5 日对上月1日至30（或31日）日的供货量进行清点，供货量以经甲方确认的单据数量为准,具体提交单据见附件6，并将单据交至甲方结算部；每月6日至25日双方对数据进行核实确认；25日之后15个工作日甲方支付乙方实际供货金额的 ﹪,余款自保修期满之日起30天内一次性无息支付。
            若乙方单据在6日以后交付至甲方，则付款相应顺延一个月。 4、乙方在收取货款时必须提供等额的合法发票凭证，并保证该凭证能在网上查核其真实性。如由于税务办理原因不能在某一时点查核的，应提供购票的合法记录，以便查核；若乙方没有按时出具等额有效票据凭证，甲方有权拒绝支付款项，并不承担违约责任，因此造成的一切负面影响和不良后果，由乙方承担。 5、甲方支付货款的方式为：转账或支票或6个月银行承兑汇票。 6、乙方在确定固定单价时已经充分考虑了本合同履行过程中的价格风险，因此，在本合同执行期间内，无论材料、运输等价格如何变化，本条约定的产品固定单价均不作任何调整。
            第八条 货物的质量保证期
            1、乙方货物的质量保证期为 年，均自甲方接收当批货物并验收达到合同书、订货清单要求之日起计。
            2、如乙方所承诺的质量保证期，低于本合同签订时国家强制性法律法规或相关行业中所定的低质量保证期限，则乙方的保证责任按照国家强制性法律法规或相关行业中所规定的低质量保证期限执行。 3、在质量保证期内，凡属乙方货物质量缺陷的，乙方必须进行更换且承担一切费用（包括所需的更换人工及材料等费用）；如属使用不当造成的问题，乙方仍应及时负责修复或更换，费用由责任方承担。 4、质量保证期内，乙方接到甲方书面通知后，须在2天内提供更换货物，否则视为授权甲方另行安排更换。由甲方另行安排维修、更换的，所发生费用及相应责任由乙方承担。前述情况下所发生的维修工作量及费用以甲方与负责维修方共同确认的工作量及费用为准，维修费用由乙方承担。如属使用不当造成的问题，乙方仍应及时负责修复或更换，费用由责任方承担。 5、对质量缺陷有争议的，甲、乙双方均可委托权威部门（中心）进行鉴定，鉴定费用由责任方承担，若属于乙方质量责任，乙方须对因质量缺陷给甲方或第三人造成的损失进行赔偿。
            6、因合同解除而导致乙方中途停止供货的，对其解除前所供的货物，乙方仍应承担质量保证责任。 7、以上保修并不免除乙方对其货物所应承担的质量保证责任。
            第九条 禁止转让、分包、贴牌生产
            1、乙方不得将其在合同中的任何义务全部或部分转让给第三人。 2、未经甲方同意，乙方不得将本合同项下权利义务转让予第三方，否则甲方有权解除本合同。如经甲方同意许可分包的，乙方仍应根据合同承担连带责任，且对其分包商、代理人及其工作人员的违约及疏忽负责。 3、乙方供给甲方的货物原则上应为乙方生产，进口货物及厂家不直接销售的除外。
            第十条 货物的所有权和风险转移
            1、甲乙双方验收确认货物并交付甲方时起，货物所有权转移至甲方。 2、货物的毁损灭失风险，在甲乙双方验收确认货物并交付甲方前由乙方承担，验收确认货物并交付甲方后由甲方承担。在此之前货物毁损、灭失的风险由乙方负责承担。 3、产品损坏、灭失风险转移给甲方后，并不能免除乙方按本合同约定所应承担的产品质量责任以及保修、维护的义务。 4、所有权和风险的转移，不影响因乙方不按本合同约定履行义务时，甲方要求其承担违约责任的权利。
            第十一条 知识产权 如因甲方购买乙方货物，造成对任何专利权、商标权、著作权、名称权或其它受保护之权利的侵犯，则所引起的一切索赔和诉讼由乙方承担责任并负责支付一切损害赔偿费、诉讼费和其它费用。
            第十二条 乙方责任
            1、甲方对乙方所交货物进行验收，同一批次不合格率达到
            3% 的，乙方必须向甲方支付该批（次）货物总金额
            20% 的违约金并按甲方的要求及时更换不合格货物，直至更换货物符合甲方的要求，甲方才对整批货物进行结算，到货时间以该批货物全部符合要求的时间为准，若违约金不足以赔偿甲方损失的，按甲方损失进行赔偿。
            2、由于乙方原因导致交货时间逾期的，但未对甲方造成损失的，每逾期一天，乙方按逾期交货部分货款的3‰向甲方支付逾期交货违约金；由于乙方原因导致交货时间逾期且造成甲方损失或影响甲方工期的，每逾
            期一天，乙方除按逾期交货部分货款的3‰向甲方支付逾期交货违约金外，还需向甲方支付不少于整批（次）货物货款20%的赔偿金，若整批（次）货物货款20%的赔偿金不足以赔偿甲方损失的，按甲方损失进行赔偿，且甲方有权单方面提出解除合同。 3、乙方如有违反本合同第九条、第十一条行为的，一经查实，甲方有权单方解除本合同，同时，乙方按违规货款总额的贰倍向甲方支付违约金。 4、本合同签订后，乙方无法定或约定理由提出解除合同，或以自己的行为表明解除合同的，乙方应向甲方支付违约金叁万元，并赔偿甲方因合同不能继续履行而给甲方造成的全部损失。 5、乙方须在收取款项前提供实际供货金额等额合法有效的增值税专用发票，否则甲方有权拒绝支付款项 及解除合同，甲方不承担违约责任，因此造成的一切负面影响和不良后果，由乙方承担。发票联若无详细明细,需附上清单明细表。乙方提交的发票必须真实、合法、有效。若乙方提交虚假发票，甲方有权解除合同，并有权转送司法机关；同时乙方需向甲方支付相当于合同总货款20%的违约金，甲方有权通过法律途径追究乙方相关责任。若乙方提供的增值税专用发票不合规定造成甲方无法抵扣的，或致使甲方被追究责任的，乙方需承担甲方因此造成的损失并按发票面额10倍给予甲方赔偿。 6、乙方供应的货物其质量不符合本合同约定标准的（包括但不限于货物瑕疵、货物质量不合格、货物无法正常使用等问题），乙方应当即进行更换，因此造成迟延交付的，乙方按第十二条第二款规定向甲方支付违约金、赔偿金。若经以上工序，乙方货物仍不符合本合同约定的，甲方有权退货及单方面解除合同并要求乙方返还该部分产品甲方已付款，同时乙方应向甲方支付合同固定总价的30%的违约金。 7、货物在使用过程中发生因乙方供应货物质量问题而引起的责任事故，由乙方承担因此发生的全部更换、修复等费用，并赔偿此给甲方或其他方收到的经济损失。 8、除了甲方特定要求定做的货物（定做产品）之外的货物均视为市场通用货物（常规产品）,如甲方所订货物（或部分货物）为市场通用货物（常规产品），甲方可根据实际需要要求本合同项下通用货物交货总数量（年度合同按单批次交货数量）的 5 %退货，如退回的货物跟乙方送货时质量基本一致，乙方必须同意退货，退货所产生的装车费、运输费及卸车费由甲方承担。乙方应在收到甲方退货通知之日起30日内收回货物，逾期不收回乙方应承担仓储费每立方货物每月
            元，未满一个月按一个月计，甲方有权在乙方应收货款中直接扣除。乙方在收到甲方退货通知之日起365日仍未收回货物，视为乙方放弃该货物的所有权及相关权利，甲方有权自行处理。
            第十三条 甲方责任
            1、甲方未按本合同约定的期限付款的，乙方应当向甲方发出书面的催款通知，甲方在收到催款通知25日内未付款的，应自收到催款通知之日起每日向乙方支付当期应付未付款项的3‰作为违约金。违约金以当期应付未付款项的5%为上限。 2、乙方按甲方订货清单送货，但由于甲方原因未能清点、验收、签收，甲方应支付该批货物的往返运费、装车费、卸车费，乙方不承担该批货物的逾期交货责任。
            第十四条 不可抗力 甲乙双方的任何一方由于不可抗力的原因不能履行合同时，应及时向对方通报不能履行或不能完全履行的理由，以减轻可能给对方造成的损失，在取得有关机构证明以后，允许延期履行、部分履行或者不履行合同，并根据情况可部分或全部免予承担违约责任。
            第十五条 其它约定
            1、 若甲方人员有索取或其他不公行为，乙方有权举报， 举报受理部门：总裁办 2、按本合同规定应该偿付的违约金、赔偿金、保管保养费和各种经济损失，应当在明确责任后 天内付 清，否则按逾期付款处理。乙方依本合同应支付的上述款项，甲方有权在货款中抵扣。货款不足以抵扣或者没有货款抵扣的，乙方应在 天内向甲方付清上述款项不足部分。 3、甲方委 为甲方授权代表，负责甲方合同履行的工作。 4、乙方委派 为乙方授权代表，负责乙方合同履行的工作。 5、如授权代表有变动时，甲乙双方均须以书面形式通知对方。 6、乙方的通讯地址为： ，邮政编码为： ，电子邮件地址为： ，甲方依本地址向乙方发送有关信函文件。 7、本合同双方如发生争议双方应尽大的努力友好地进行协商解决。若协商不能解决，则任何一方可将该争议提交广州仲裁委员会，按照该会现行有效的仲裁规则进行仲裁。仲裁程序中使用的语言为中文。仲裁地点为广州市，仲裁裁决应是终局裁决，对各方具有约束力。除非仲裁裁决另有决定，仲裁费用（含律师费）应由败诉方承担。 8、合同的有效供货期限按甲方订货清单为准。 9、本合同一式 份，甲乙双方各执 份，各份具同等法律效力，自甲、乙双方签字盖章之日起生效。
            第十六条 合同附件
            本合同包含的附件： 附件1：货物供应价格清单 共 页 附件2：货物质量验收标准 共 页 附件3：订货清单式样 共 页 附件4：采购入库单 共 页 附件5：质量保证与售后服务承诺 共 页 附件6 《供应商交单须知 》 共 页 附件7：《交接清单》 共 页 附件8：《对账单》 共 页 附件9：《过期（遗失单据报告》 附件10：《廉洁协议》 共 页 附件11：《举报渠道告知函》
            甲方（盖章）： 乙方（盖章）：
            甲方代表： 乙方代表：
            统一社会信用代码： 统一社会信用代码：
            电话： 电话：
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import banner from "../components/homebanner";
import tabBar from "../components/tabBar";
import moPagination from "../components/pagenation";
export default {
  name: "servise",
  data() {
    return {
      // 分页
      pageSize: 24, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 300, // 总记录数,
      curindex: null,
      tabtitle: {
        a: "服务与",
        b: "支持"
      },
      tabnav: ["团队展示", "服务流程", "安装流程", "工程售后维保", "服务条款"],
      teaminfo: [
        {
          img: require("../assets/ser/onepp.png"),
          name: "冯经理",
          job: "项目经理"
        },
        {
          img: require("../assets/ser/onepp.png"),
          name: "张经理",
          job: "项目经理"
        },
        {
          img: require("../assets/ser/onepp.png"),
          name: "周经理",
          job: "项目经理"
        },
        {
          img: require("../assets/ser/onepp.png"),
          name: "李经理",
          job: "项目经理"
        }
      ],
      insli: [
        {
          img: require("../assets/shopshow/bg.png"),
          title: "中央空调安装全过程记录",
          time: "2010.8.03",
          intro: "舒服舒服大撒大声地",
          xq: "红盛花园",
          home: "三室两厅",
          area: "100㎡"
        },
        {
          img: require("../assets/shopshow/bg.png"),
          title: "中央空调安装全过程记录",
          time: "2010.8.03",
          intro: "舒服舒服大撒大声地",
          xq: "香榭名苑",
          home: "三室两厅",
          area: "100㎡"
        },
        {
          img: require("../assets/shopshow/bg.png"),
          title: "中央空调安装全过程记录",
          time: "2010.8.03",
          intro: "舒服舒服大撒大声地",
          xq: "清溪南街",
          home: "三室两厅",
          area: "100㎡"
        }
      ]
    };
  },
  created() {
    let idx = sessionStorage.getItem("mnavindex");
    if (!idx) {
      this.curindex = 0;
    } else {
      idx == 3 ? (this.curindex = 4) : (this.curindex = Number(idx));
    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 300;
  },
  methods: {
    // 分页
    getList(page) {
      // this.requstKind(this.class_id, page);
    },
    pageChange(index) {
      this.currentPage = index;
      // console.log( this.currentPage)
      this.getList(index);
    },
    tonav(index) {
      //  console.log(index)
      this.curindex = index;
    }
  },

  components: { banner, tabBar, moPagination }
};
</script>

<style lang="less" scoped>
.service {
  width: 100%;
  .servisebox {
    width: 100%;
    border-top: 1px solid rgba(153, 153, 153, 0.3);
    border-bottom: 1px solid rgba(153, 153, 153, 0.3);
    box-sizing: border-box;
    padding: 60px 0 100px 0;
    .serv {
      width: 1200px;
      margin: 0 auto;
      box-sizing: border-box;
      padding-top: 53px;
    }
    .mo-paging {
      width: 100%;
      // background: pink;
      text-align: center;
      box-sizing: border-box;
      padding-top: 53px;
    }
    // 0
    .team {
      .teamshow {
        width: 100%;
        height: 465px;
        display: flex;
        .ts-left {
          width: 758px;
          height: 465px;
        }
        .ts-right {
          width: 441px;
          box-sizing: border-box;
          padding: 64px 0 0 48px;
          .top {
            font-size: 24px;
            color: rgba(62, 145, 223, 1);
            line-height: 45px;
            font-weight: bold;
          }
          .deshed {
            color: rgba(204, 204, 204, 1);
            font-size: 24px;
          }
          .bottom {
            padding-top: 20px;
            color: rgba(153, 153, 153, 1);
            line-height: 35px;
          }
        }
      }
      .teaminfo {
        // background: pink;
        box-sizing: border-box;
        padding-top: 24px;
        width: 100%;
        height: 455px;
        display: flex;
        justify-content: space-between;
        .teaminfoli {
          width: 282px;
          height: 380px;

          .pics {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
          .name {
            position: relative;
            top: 10px;
            width: 282px;
            height: 39px;
            text-align: center;
            line-height: 39px;
            background: rgba(236, 236, 236, 1);
            border-radius: 10px;
            font-size: 16px;
            color: rgba(91, 91, 91, 1);
            font-weight: 300;
            span {
              margin: 0 5px;
            }
          }
        }
      }
    }
    // 1
    .process {
      width: 100%;
      .protop {
        text-align: center;
        font-size: 24px;
        color: rgba(51, 51, 51, 1);
      }
      .propic {
        text-align: center;
        box-sizing: border-box;
        padding-top: 37px;
      }
      .profw {
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
        line-height: 35px;
        // font-weight:400;
        box-sizing: border-box;
        padding-top: 40px;
        p {
          width: 908px;
          margin: 0 auto;
        }
      }
    }
    // 2
    .install {
      width: 1200px;
      margin: 0 auto;
      // background: pink;
      .ins-list {
        width: 100%;
        .ins-li {
          width: 100%;
          height: 300px;
          border-bottom: 1px solid rgba(204, 204, 204, 1);
          display: flex;
          justify-content: flex-start;
          .mainpic {
            margin-top: 30px;
            width: 343px;
            height: 240px;
            background: rgba(255, 255, 255, 1);
            border-radius: 10px;
          }
          .ins-info {
            cursor: pointer;
            width: calc(100% - 345px);
            box-sizing: border-box;
            padding: 60px 0 0 47px;
            .title {
              font-size: 24px;
              font-weight: bold;
              color: rgba(51, 51, 51, 1);
              line-height: 45px;
              &:hover {
                color: rgba(36, 130, 200, 1);
              }
            }
            .time {
              font-size: 14px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 45px;
            }
            .intro {
              font-size: 16px;
              // font-weight: 300;
              color: rgba(51, 51, 51, 1);
              line-height: 27px;
              span {
                margin-right: 25px;
              }
            }
            .more {
              width: 133px;
              height: 31px;
              text-align: center;
              border: 1px solid rgba(153, 153, 153, 1);
              border-radius: 5px;
              font-size: 14px;
              font-weight: 300;
              color: rgba(153, 153, 153, 1);
              line-height: 31px;
              margin-top: 30px;
              &:hover {
                border: 1px solid rgba(62, 145, 223, 1);
                color: rgba(62, 145, 223, 1);
              }
            }
          }
        }
      }
    }
    // 3
    .repair {
      width: 1200px;
      margin: 0 auto;
      .repic {
        width: 100%;
        position: relative;
        .telinfo {
          // background: pink;
          position: absolute;
          top: 0;
          left: 0;
          box-sizing: border-box;
          padding: 60px 0 0 33px;
          font-weight: 400;
          .text {
            color: rgba(153, 153, 153, 1);
            line-height: 42px;
            font-weight: 400;
          }
          h1 {
            color: rgba(62, 145, 223, 1);
          }
          .tel {
            font-size: 20px;
            color: rgba(51, 51, 51, 1);
            line-height: 42px;
          }
          a {
            margin-top: 25px;
            display: inline-block;
            width: 191px;
            height: 34px;
            background: rgba(62, 145, 223, 1);
            border: 1px solid rgba(62, 145, 223, 1);
            border-radius: 10px;
            text-align: center;
            line-height: 34px;
            color: white;
          }
        }
      }
      .reinfo {
        box-sizing: border-box;
        padding-top: 60px;
        color: rgba(51, 51, 51, 1);
        p {
          font-size: 20px;
        }
        section {
          line-height: 35px;
          font-size: 16px;
          // css保留空格和换行符
          // white-space: pre-wrap;
          // css保留换行符
          white-space: pre-line;
        }
      }
    }
    //4
    .clause {
      width: 1200px;
      margin: 0 auto;
      color: rgba(51, 51, 51, 1);
      p {
        font-size: 24px;
        text-align: center;
        box-sizing: border-box;
        padding-bottom: 20px;
      }
      .clauseinfo {
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 10px;
        box-sizing: border-box;
        padding: 31px 46px 24px 24px;
        section {
          margin: 0 auto;
          // background: peachpuff;
          width: 1150px;
          height: 859px;
          overflow-y: scroll;
          font-size: 16px;
          // css保留空格和换行符
          white-space: pre-wrap;
        }
      }
    }
  }
}
</style>