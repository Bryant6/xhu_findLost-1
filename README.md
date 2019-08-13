# xhu_findLost
### 接口文档

#### 动态

##### 1. 接口名字：findOwnerSort

+ 板块：校园动态

+ 概述：按时间先后排序，按照大类划分，按照页数获取全校发布的”寻找失主”信息

+ 传入参数：page(Integer)   kind(String)

+ 传入参数说明：

     + page：数据的页数，初始是从0开始
     + kind：大类

+ 返回数据：List\<FindInfo> 

+ 返回数据说明：FindInfo为单个数据类，只需要返回每个数据的goods_id,goods_pubtime,goods_smallkind（小类）,goods_photo,goods_bigkind（大类）

##### 2. 接口名字：findGoodsSort
+ 板块：校园动态

+ 概述：按时间先后排序，按照大类划分，按照页数获取全校发布的”寻找失物”信息

+ 传入参数：page(Integer)   kind(String)

+ 传入参数说明：

     + page：数据的页数，初始是从0开始
     + kind：大类

+ 返回数据：List\<FindInfo> 

+ 返回数据说明：FindInfo为单个数据类，只需要返回每个数据的goods_id,goods_pubtime,goods_smallkind（小类）,goods_photo,goods_bigkind（大类）

##### 3. 接口名字：publish/findGoodsSubmit

+ 板块：发布

+ 概述：将发布信息上传到后台，并录入数据库（有图片）
+ 传入参数和数据类型：
     + userId：上传者的id（String）
     + userName：上传者的名字（String）
     + goodsBigkind ：物品大类（String）
     + goodsSmallkind ：物品小类（String）
     + goodsPostscrit ：发布附言（String）
     + goodsContact ：联系方式（String）
     + goodsContact_way ：联系方式  qq weixn phone（String）
     + file：一张图片文件（File）
     + publishCategory ：发布种类？失物寻找：失物归还（String）
+ 返回数据：“yes”(成功上传)   “no” (失败上传)
+ 返回类型：String
##### 4. 接口名字：publish/findGoodsSubmitNoImg

+ 板块：发布

+ 概述：将发布信息上传到后台，并录入数据库（无图片）
+ 传入的参数和数据类型：
     - userId：上传者的id（String）
     - userName：上传者的名字（String）
     - goodsBigkind ：物品大类（String）
     - goodsSmallkind ：物品小类（String）
     - goodsPostscrit ：发布附言（String）
     - goodsContact ：联系方式（String）
     - goodsContact_way ：联系方式  qq weixn phone（String）
     - publishCategory ：发布种类？失物寻找：失物归还（String）
+ 返回数据：“yes”(成功上传)   “no” (失败上传)
+ 返回类型：String
##### 5. 接口名字：personal/feedback

+ 板块：我的/反馈

+ 概述：将用户反馈的信息上传到后台（有图片）
+ 传入的参数和数据类型：
      - suggest：用户建议（String）
      - contact：用户联系方式（String）
      - file：一张图片文件（File）
+ 返回数据：“yes”(成功上传)   “no” (失败上传)
+ 返回类型：String

##### 6.接口名字：personal/feedbackNoImg

+ 板块：我的/反馈

+ 将用户反馈的信息上传到后台（无图片）
+ 传入的参数和数据类型：
  - suggest：用户建议（String）
  - contact：用户联系方式（String）
+ 返回数据：“yes”(成功上传)   “no” (失败上传)
+ 返回类型：String

 