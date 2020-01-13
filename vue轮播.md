##### vue轮播

html部分

```
   <div class="pgbtn prev">
        <div
          class="btpic"
          @click="zuohua"
          :style="{backgroundImage: 'url(' +require('@/assets/home/anlie_01.png') + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
      </div>
  <div class="flash">
        <ul
          class="warpper"
          :style="{'left':calleft + 'px'}"
          v-on:mouseover="stopmove()"
          v-on:mouseout="move()"
        >
          <li class="pic" v-for="(item, index) in caseinfo" :key="index" 		    	@click="todetails(item)">
            <div class="pics">
              <img :src="baseurl+`/public/`+item.image_url" alt />
              <div class="ts">
                <img class="yy" src="../assets/home/pro_zezhao.png" alt />
                <p>经典案例</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="pgbtn next">
        <div
          class="btpic"
          @click="youhua"
          :style="{backgroundImage: 'url(' +require('@/assets/home/anlie_02.png') + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
        ></div>
      </div>
```

js部分

```


```

