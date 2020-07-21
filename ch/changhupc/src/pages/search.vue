<template>
  <div
    class="product"
    :style="{backgroundImage: 'url(' + require('../assets/mainbg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
  >
    <div class="bg">
      <div
        class="topbg"
        :style="{backgroundImage: 'url(' + require('../assets/product/tpbg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
      ></div>
      <div
        class="ctbg"
        :style="{backgroundImage: 'url(' + require('../assets/mainbg.png')+ ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
      ></div>
    </div>
    <div class="content">
      <div class="cont-left">
        <div class="icon" id="proicon">
          <transition name="trans-pro">
            <img v-if="trans" src="../assets/product/bt.png" alt />
          </transition>
        </div>
        <transition name="trans-prolfli">
          <div class="cllist" v-if="trans">
            <div
              class="clli"
              v-for="(item, index) in res"
              :key="index"
              :class="proClass ==index?'show':''"
            >
              <div class="cllibox" @click="toNav(item,index)">
                <p>{{item.class_name}}</p>
                <div class="arrow">
                  <img src="../assets/home/jt.png" alt />
                </div>
              </div>

              <vue-scroll v-show="proClass ==index" :ops="ops" style="height:196px">
                <div class="proName">
                  <div class="pronamelist">
                    <div class="pronameli" v-for="(item, index) in total" :key="index">
                      <div class="probox" :class="prolistclass ==index?'show':''">
                        <div class="mainpic" v-show="prolistclass ==index">
                          <img src="../assets/product/pnamejt.png" alt />
                        </div>
                        <p class="title" @click="toproitem(item,index)">{{item.article_title}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </vue-scroll>
            </div>
          </div>
        </transition>
      </div>
      <div class="cont-right">
        <div class="crtop">
          <transition name="trans-rtpro">
            <ul class="prolist" v-if="trans">
              <li class="proli" v-for="(item, index) in prolista" :key="index">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+item.image_url +  ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{item.article_title}}</p>
                <div class="todetail" @click="todetail(item)">
                  <span>{{item.article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </li>
            </ul>
          </transition>
        </div>
        <div class="crcenter probox">
          <transition name="centera">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistb[0]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+prolistb[0].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{prolistb[0].article_title}}</p>
                <div class="todetail" @click="todetail(prolistb[0])">
                  <span>{{prolistb[0].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="centerb">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistb[1]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+prolistb[1].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{prolistb[1].article_title}}</p>
                <div class="todetail" @click="todetail(prolistb[1])">
                  <span>{{prolistb[1].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="centerc">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistb[2]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+prolistb[2].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{prolistb[2].article_title}}</p>
                <div class="todetail" @click="todetail(prolistb[2])">
                  <span>{{prolistb[2].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="centerd">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistb[3]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+prolistb[3].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{prolistb[3].article_title}}</p>
                <div class="todetail" @click="todetail(prolistb[3])">
                  <span>{{prolistb[3].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <div class="ctbt probox">
          <transition name="proarra">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistc[0]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+prolistc[0].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{prolistc[0].article_title}}</p>
                <div class="todetail" @click="todetail(prolistc[0])">
                  <span>{{prolistc[0].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="proarrb">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistc[1]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+prolistc[1].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{prolistc[1].article_title}}</p>
                <div class="todetail" @click="todetail(prolistc[1])">
                  <span>{{prolistc[1].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="proarrc">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistc[2]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+prolistc[2].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{prolistc[2].article_title}}</p>
                <div class="todetail" @click="todetail(prolistc[2])">
                  <span>{{prolistc[2].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="proarrd">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistc[3]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+prolistc[3].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{prolistc[3].article_title}}</p>
                <div class="todetail" @click="todetail(prolistc[3])">
                  <span>{{prolistc[3].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <div class="btbt probox">
          <transition name="btarra">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistd[0]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+prolistd[0].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{prolistd[0].article_title}}</p>
                <div class="todetail" @click="todetail(prolistd[0])">
                  <span>{{prolistd[0].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="btarrb">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistd[1]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+prolistd[1].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{prolistd[1].article_title}}</p>
                <div class="todetail" @click="todetail(prolistd[1])">
                  <span>{{prolistd[1].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="btarrc">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistd[2]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+prolistd[2].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{prolistd[2].article_title}}</p>
                <div class="todetail" @click="todetail(prolistd[2])">
                  <span>{{prolistd[2].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="btarrd">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistd[3]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+prolistd[3].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{prolistd[3].article_title}}</p>
                <div class="todetail" @click="todetail(prolistd[3])">
                  <span>{{prolistd[3].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <div class="fifthbt probox">
          <transition name="fiftha">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="proliste[0]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+proliste[0].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{proliste[0].article_title}}</p>
                <div class="todetail" @click="todetail(proliste[0])">
                  <span>{{proliste[0].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="fifthb">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="proliste[1]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+proliste[1].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{proliste[1].article_title}}</p>
                <div class="todetail" @click="todetail(proliste[1])">
                  <span>{{proliste[1].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="fifthc">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="proliste[2]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+proliste[2].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{proliste[2].article_title}}</p>
                <div class="todetail" @click="todetail(proliste[2])">
                  <span>{{proliste[2].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="fifthd">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="proliste[3]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+proliste[3].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{proliste[3].article_title}}</p>
                <div class="todetail" @click="todetail(proliste[3])">
                  <span>{{proliste[3].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <div class="sixthbt probox">
          <transition name="sixtha">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistf[0]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+prolistf[0].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{prolistf[0].article_title}}</p>
                <div class="todetail" @click="todetail(prolistf[0])">
                  <span>{{prolistf[0].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="sixthb">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistf[1]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+prolistf[1].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{prolistf[1].article_title}}</p>
                <div class="todetail" @click="todetail(prolistf[1])">
                  <span>{{prolistf[1].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="sixthc">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistf[2]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+prolistf[2].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{prolistf[2].article_title}}</p>
                <div class="todetail" @click="todetail(prolistf[2])">
                  <span>{{prolistf[2].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="sixthd">
            <div class="prolist" v-if="trans">
              <div class="proli" v-if="prolistf[3]">
                <div
                  class="mainpic"
                  :style="{backgroundImage: 'url(' +baseurl+`/public/`+prolistf[3].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                ></div>
                <p class="title">{{prolistf[3].article_title}}</p>
                <div class="todetail" @click="todetail(prolistf[3])">
                  <span>{{prolistf[3].article_title}}</span>
                  <span>
                    <img src="../assets/home/lf.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <!-- 分页 -->
        <mo-pagination
          :page-index="currentPage"
          :total="count"
          :page-size="pageSize"
          @change="pageChange"
        ></mo-pagination>
        <!-- 推荐 -->
        <div class="othercase">
          <div class="other-pic">
            <transition name="recom-pic">
              <img v-if="transa" src="../assets/case/bt.png" alt />
            </transition>
          </div>
          <div class="btbt probox">
            <transition name="recoma">
              <div class="prolist" v-if="transa">
                <div class="proli" v-if="recoma[0]">
                  <div
                    class="mainpic"
                    :style="{backgroundImage: 'url(' +baseurl+`/public/`+recoma[0].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                  ></div>
                  <p class="title">{{recoma[0].article_title}}</p>
                  <div class="todetail" @click="todetail(recoma[0])">
                    <span>{{recoma[0].article_title}}</span>
                    <span>
                      <img src="../assets/home/lf.png" alt />
                    </span>
                  </div>
                </div>
              </div>
            </transition>
            <transition name="recomb">
              <div class="prolist" v-if="transa">
                <div class="proli" v-if="recoma[1]">
                  <div
                    class="mainpic"
                    :style="{backgroundImage: 'url(' +baseurl+`/public/`+recoma[1].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                  ></div>
                  <p class="title">{{recoma[1].article_title}}</p>
                  <div class="todetail" @click="todetail(recoma[1])">
                    <span>{{recoma[1].article_title}}</span>
                    <span>
                      <img src="../assets/home/lf.png" alt />
                    </span>
                  </div>
                </div>
              </div>
            </transition>
            <transition name="recomc">
              <div class="prolist" v-if="transa">
                <div class="proli" v-if="recoma[2]">
                  <div
                    class="mainpic"
                    :style="{backgroundImage: 'url(' +baseurl+`/public/`+recoma[2].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                  ></div>
                  <p class="title">{{recoma[2].article_title}}</p>
                  <div class="todetail" @click="todetail(recoma[2])">
                    <span>{{recoma[2].article_title}}</span>
                    <span>
                      <img src="../assets/home/lf.png" alt />
                    </span>
                  </div>
                </div>
              </div>
            </transition>
            <transition name="recomd">
              <div class="prolist" v-if="transa">
                <div class="proli" v-if="recoma[3]">
                  <div
                    class="mainpic"
                    :style="{backgroundImage: 'url(' +baseurl+`/public/`+recoma[3].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                  ></div>
                  <p class="title">{{recoma[3].article_title}}</p>
                  <div class="todetail" @click="todetail(recoma[3])">
                    <span>{{recoma[3].article_title}}</span>
                    <span>
                      <img src="../assets/home/lf.png" alt />
                    </span>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div class="btbt probox">
            <transition name="recomsa">
              <div class="prolist" v-if="transa">
                <div class="proli" v-if="recomb[0]">
                  <div
                    class="mainpic"
                    :style="{backgroundImage: 'url(' +baseurl+`/public/`+recomb[0].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                  ></div>
                  <p class="title">{{recomb[0].article_title}}</p>
                  <div class="todetail" @click="todetail(recomb[0])">
                    <span>{{recomb[0].article_title}}</span>
                    <span>
                      <img src="../assets/home/lf.png" alt />
                    </span>
                  </div>
                </div>
              </div>
            </transition>
            <transition name="recomsb">
              <div class="prolist" v-if="transa">
                <div class="proli" v-if="recomb[1]">
                  <div
                    class="mainpic"
                    :style="{backgroundImage: 'url(' +baseurl+`/public/`+recomb[1].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                  ></div>
                  <p class="title">{{recomb[1].article_title}}</p>
                  <div class="todetail" @click="todetail(recomb[1])">
                    <span>{{recomb[1].article_title}}</span>
                    <span>
                      <img src="../assets/home/lf.png" alt />
                    </span>
                  </div>
                </div>
              </div>
            </transition>
            <transition name="recomsc">
              <div class="prolist" v-if="transa">
                <div class="proli" v-if="recomb[2]">
                  <div
                    class="mainpic"
                    :style="{backgroundImage: 'url(' +baseurl+`/public/`+recomb[2].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                  ></div>
                  <p class="title">{{recomb[2].article_title}}</p>
                  <div class="todetail" @click="todetail(recomb[2])">
                    <span>{{recomb[2].article_title}}</span>
                    <span>
                      <img src="../assets/home/lf.png" alt />
                    </span>
                  </div>
                </div>
              </div>
            </transition>
            <transition name="recomsd">
              <div class="prolist" v-if="transa">
                <div class="proli" v-if="recomb[3]">
                  <div
                    class="mainpic"
                    :style="{backgroundImage: 'url(' +baseurl+`/public/`+recomb[3].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
                  ></div>
                  <p class="title">{{recomb[3].article_title}}</p>
                  <div class="todetail" @click="todetail(recomb[3])">
                    <span>{{recomb[3].article_title}}</span>
                    <span>
                      <img src="../assets/home/lf.png" alt />
                    </span>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moPagination from "../components/pagenation";
import httpUrl from "../utils/url";
export default {
  name: "product",
  data() {
    return {
      keywords: "",
      baseurl: "",
      pronameshow: false,
      pageSize: 24, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 1, // 总记录数,
      trans: false,
      transa: false,
      proClass: 0,
      prolistclass: 0,
      scrolldis: "",
      navlist: [],
      prolista: [],
      prolistb: [],
      prolistc: [],
      prolistd: [],
      proliste: [],
      prolistf: [],
      recoma: [],
      recomb: [],
      proNameList: [],
      class_id: "",
      res: [],
      total: [],
      infos: [],
      ops: {
        vuescroll: {
          mode: "native",
          sizeStrategy: "percent",
          detectResize: true
        },
        scrollPanel: {
          scrollingY: true,
          speed: 500
        },
        rail: {
          background: "#090909",
          opacity: 1,
          size: "6px",
          specifyBorderRadius: false,
          gutterOfEnds: null, //轨道距 x 和 y 轴两端的距离
          gutterOfSide: "0", //距离容器的距离
          keepShow: false, //是否即使 bar 不存在的情况下也保持显示
          border: "none" //边框
        },
        bar: {
          minSize: 0.3,
          hoverStyle: true,
          onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: "#82c41c" //颜色
        }
      }
    };
  },
  created() {
    this.baseurl = httpUrl.httpUrl;
    this.keywords = this.$route.query.search;
    this.requst(this.keywords);
  },
  mounted() {
    this.trans = true;

    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    todetail(item) {
      // console.log(item);
      let id = item.article_id;
      this.$router.push({
        path: "/detail",
        query: { id: id }
      });
    },
    // 请求数据
    requst(val) {
      this.$axios.post("/index/api/getProductClass").then(res => {
        this.res = res.data.data;
        this.class_id = this.res[0].class_id;
        this.requstKind(this.class_id, 1);
        this.requstSearch(val);
      });
    },
    requstKind(val, page) {
      this.$axios
        .post("/index/api/getProductList", {
          id: val,
          limit: 24,
          page: page
        })
        .then(res => {
          this.total = res.data.data.total.reverse();
        });
    },
    requstSearch(val, page) {
      this.$axios
        .post("/index/api/getProductList", {
          keyword: val
        })
        .then(res => {
          this.count = res.data.data.total.length;
          this.prolista = res.data.data.data.slice(0, 4);
          this.prolistb = res.data.data.data.slice(4, 8);
          this.prolistc = res.data.data.data.slice(8, 12);
          this.prolistd = res.data.data.data.slice(12, 16);
          this.proliste = res.data.data.data.slice(16, 20);
          this.prolistf = res.data.data.data.slice(20, 24);
          this.recoma = res.data.data.best.slice(0, 4);
          this.recomb = res.data.data.best.slice(4, 8);
        });
    },
    handleScroll: function() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrolldis = scrollTop;
      //   console.log(this.scrolldis);
      if (this.scrolldis >= 50) {
        this.transa = true;
      }
    },
    getList(page) {
      this.requstKind(this.class_id, page);
    },
    pageChange(index) {
      this.currentPage = index;
      // console.log( this.currentPage)
      this.getList(index);
    },
    toNav(item, index) {
      this.proClass = index;
      this.class_id = item.class_id;
      this.requstKind(this.class_id);
      // this.pronameshow = !this.pronameshow
    },
    toproitem(item, index) {
      // 回到初始位置
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      let id = item.article_id;
      this.$router.push({
        path: "/detail",
        query: { id: id }
      });
      // 刷新页面
      this.$router.go(0);
    }
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  components: { moPagination }
};
</script>
<style lang="less" scoped>
// 左边
.trans-pro-enter-active {
  transition: all 1.5s ease-in-out;
}
.trans-prolfli-enter-active {
  transition: all 2s ease-in-out;
}
.trans-pro-enter,
.trans-prolfli-enter {
  transform: translateX(-100px);
}
// 第一排
.trans-rtpro-enter-active {
  transition: all 2s ease-in-out;
}
.trans-rtpro-enter {
  transform: translateY(0px);
}
// 第二排
.centera-enter-active {
  transition: all 0.5s linear;
}
.centerb-enter-active {
  transition: all 1s linear;
}
.centerc-enter-active {
  transition: all 1.5s linear;
}
.centerd-enter-active {
  transition: all 2s linear;
}
.centera-enter,
.centerb-enter,
.centerc-enter,
.centerd-enter {
  transform: translateY(30px);
}
// 第三排
.proarra-enter-active {
  transition: all 2.5s ease-in-out;
}
.proarrb-enter-active {
  transition: all 3s ease-in-out;
}
.proarrc-enter-active {
  transition: all 3.5s ease-in-out;
}
.proarrd-enter-active {
  transition: all 4s ease-in-out;
}

.proarra-enter,
.proarrb-enter,
.proarrc-enter,
.proarrd-enter {
  transform: translateY(40px);
}

//第四排
.btarra-enter-active {
  transition: all 4.5s ease-in-out;
}
.btarrb-enter-active {
  transition: all 5s ease-in-out;
}
.btarrc-enter-active {
  transition: all 5.5s ease-in-out;
}
.btarrd-enter-active {
  transition: all 6s ease-in-out;
}

.btarra-enter,
.btarrb-enter,
.btarrc-enter,
.btarrd-enter {
  transform: translateY(60px);
}
//第五排
.fiftha-enter-active {
  transition: all 6.5s ease-in-out;
}
.fifthb-enter-active {
  transition: all 7s ease-in-out;
}
.fifthc-enter-active {
  transition: all 7.5s ease-in-out;
}
.fifthd-enter-active {
  transition: all 8s ease-in-out;
}

.fiftha-enter,
.fifthb-enter,
.fifthc-enter,
.fifthd-enter {
  transform: translateY(70px);
}
//第六排
.sixtha-enter-active {
  transition: all 8.5s ease-in-out;
}
.sixthb-enter-active {
  transition: all 9s ease-in-out;
}
.sixthc-enter-active {
  transition: all 9.5s ease-in-out;
}
.sixthd-enter-active {
  transition: all 10s ease-in-out;
}

.sixtha-enter,
.sixthb-enter,
.sixthc-enter,
.sixthd-enter {
  transform: translateY(80px);
}
//推荐图片
.recom-pic-enter-active {
  transition: all 2s ease-in-out;
}
.recom-pic-enter {
  transform: translateX(-100px);
}
//推荐 第一排
.recoma-enter-active {
  transition: all 1.5s ease-in-out;
}
.recomb-enter-active {
  transition: all 2s ease-in-out;
}
.recomc-enter-active {
  transition: all 2.5s ease-in-out;
}
.recomd-enter-active {
  transition: all 3s ease-in-out;
}

.recoma-enter,
.recomb-enter,
.recomc-enter,
.recomd-enter {
  transform: translateY(40px);
}
//推荐  第二排
.recomsa-enter-active {
  transition: all 3s ease-in-out;
}
.recomsb-enter-active {
  transition: all 3.5s ease-in-out;
}
.recomsc-enter-active {
  transition: all 4s ease-in-out;
}
.recomsd-enter-active {
  transition: all 4.5s ease-in-out;
}

.recomsa-enter,
.recomsb-enter,
.recomsc-enter,
.recomsd-enter {
  transform: translateY(60px);
}

.product {
  // background: orange;
  width: 100%;
  min-width: 1200px;
  //   min-height:1000px;
  position: relative;
  .bg {
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0;
    z-index: 0;
    .topbg {
      width: 100%;
      height: 360px;
    }
    .ctbg {
      width: 100%;
    }
  }
  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .cont-left {
      box-sizing: border-box;
      width: 20%;
      padding: 160px 0 0 7px;
      text-align: center;
      position: relative;
      .icon {
        height: 200px;
        img {
          height: 100%;
        }
      }
      .cllist {
        margin: 30px auto;
        width: 80%;
        border-top: 4px solid #82c41c;
        color: white;
        background: #090909;
        .cllibox {
          box-sizing: border-box;
          width: 100%;
          height: 28px;
          line-height: 28px;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          margin: 10px auto;
          padding: 0px 5%;
        }
        .show > .cllibox {
          background: #82c41c;
        }
        .proName {
          width: 95%;
          .pronamelist {
            width: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            border-top: 1px dashed #f5f5f5;
            // border-bottom: 1px dashed #f5f5f5;
            .pronameli {
              cursor: pointer;
              width: 49.5%;
              border-bottom: 1px dashed #f5f5f5;
              .title {
                width: 100%;
                text-align: left;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .probox {
                box-sizing: border-box;
                width: 100%;
                height: 28px;
                line-height: 28px;
                font-size: 12px;
                display: flex;
                justify-content: flex-start;
                margin: 10px auto;
                padding: 0px 5%;
              }
              .show {
                background: #82c41c;
              }
              &:hover .probox {
                background: #82c41c;
              }
            }
            // :last-child {
            //   border-bottom: none;
            // }
            // :nth-last-child(2) {
            //   border-bottom: none;
            // }
          }
        }
        .clli {
          cursor: pointer;
          margin: 0 auto;
          width: 85%;
          border-bottom: 1px dashed #f5f5f5;

          &:hover .cllibox {
            background: #82c41c;
          }
        }
        :not(:first-child) {
          border-top: none;
        }
      }
    }
    .cont-right {
      box-sizing: border-box;
      width: 80%;
      height: 100%;
      padding: 315px 0 0 0;
      padding-right: 20px;
      .proli {
        height: 230px;
        position: relative;
        .mainpic {
          width: 100%;
          height: 100%;
        }
        .title {
          background: rgba(0, 0, 0, 1);
          opacity: 0.6;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: white;
          font-size: 14px;
        }
        .todetail {
          box-sizing: border-box;
          width: 100%;
          height: 40px;
          background: #82c41c;
          opacity: 0.9;
          position: absolute;
          bottom: 0;
          left: 0;
          color: white;
          font-size: 14px;
          line-height: 40px;
          padding: 0 20px;
          display: none;
        }
        &:hover .title {
          display: none;
        }
        &:hover .todetail {
          cursor: pointer;
          display: flex;
          justify-content: space-between;
        }
      }
      .crtop {
        width: 100%;
        padding-bottom: 1%;
        .prolist {
          width: 100%;
          height: 100%;
          // display: flex;
          // flex-wrap: wrap;
          // justify-content: space-between;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-gap: 20px;
          .proli {
            width: 100%;
          }
        }
      }
      .probox {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 20px;
        .prolist {
          width: 100%;
          height: 100%;
          .proli {
            width: 100%;
          }
        }
      }
      .othercase {
        box-sizing: border-box;
        padding-bottom: 40px;
        .other-pic {
          padding-bottom: 40px;
        }
      }
    }
  }
  .pagenation {
    box-sizing: border-box;
    padding: 90px 0 0 0;
  }
}
</style>