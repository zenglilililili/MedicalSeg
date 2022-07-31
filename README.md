# MedicalSeg

系统主要功能：将深度学习模型的预测结果存储为轮廓值放到数据库中，然后在系统中进行展示

## 前端 /front
前端使用react框架，主要参考https://jspang.com/article/52 进行适应性开发

### (1)启动

- 进入/front目录
- 命令行输入yarn run start
- 浏览器打开 http://localhost:3000/login

###(2)目录

- 页面
	/front/src/Pages/Main.js 前端入口
	/front/src/Pages/Login.js 登录界面（对应网页http://localhost:3000/login）
	/front/src/Pages/register.js 注册界面
	/front/src/Pages/patList.js 病人列表界面
	/front/src/Pages/ctlist.js CT列表界面
	/front/src/Pages/slicelist.js 切片列表界面
	/front/src/Pages/delineate.js 勾画结果界面
- 数据
数据存放在/front/src/data/*

CT切片数据：在/front/src/data/目录下，文件夹目录依次为病人Id/ctId/sliceId,如0017593853为病人Id，点开后其中的文件夹1为ctId，点开文件夹1后的0.jpg为sliceId
标签数据：标签数据存在数据库中，通过访问后台获得（具体请看delineate相关前后端内容）

## 后端 /backendcontour
后端使用spring boot微服务架构

### (1)启动
 - idea中点击运行\backendcontour\src\main\java\com\contour\BackendcontourApplication.java
 
### (2)目录

- 接口文件位置
    backendcontour\src\main\java\com\contour\controller\*


## 数据库 /db
数据库仅包含一例病例，其余数据需自行导入
数据库设计详见毕业论文
