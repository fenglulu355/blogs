##### vue设置背景图片，居中

```
 :style="{backgroundImage: 'url(' +baseurl+`/public/`+homeFlxedlist[0].image_url + ')',
             backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
            }"
```

本地图片：

```

backgroundImage: 'url(' + require("@/assets/bg-black.png") + ')',
```

