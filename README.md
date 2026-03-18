# OCR 图片文字识别服务 / OCR Image Text Recognition Service

基于 NestJS + 阿里云 OCR API 的图片文字识别服务。

An image text recognition service based on NestJS and Alibaba Cloud OCR API.

## 功能特性 / Features

- 支持上传图片进行文字识别 / Support uploading images for text recognition
- 支持多种图片格式 (PNG, JPG, JPEG, GIF, BMP, WEBP) / Support multiple image formats
- 基于阿里云 OCR API / Based on Alibaba Cloud OCR API
- 统一响应格式 / Unified response format

## 环境配置 / Environment Setup

### 1. 安装依赖 / Install Dependencies

```bash
yarn install
```

### 2. 配置环境变量 / Configure Environment Variables

在项目根目录创建 `.env` 文件，添加阿里云 AccessKey 凭证：

Create a `.env` file in the project root and add your Alibaba Cloud AccessKey credentials:

```env
# 阿里云 AccessKey ID / Alibaba Cloud AccessKey ID
ALIBABA_CLOUD_ACCESS_KEY_ID=your_access_key_id

# 阿里云 AccessKey Secret / Alibaba Cloud AccessKey Secret
ALIBABA_CLOUD_ACCESS_KEY_SECRET=your_access_key_secret
```

> ⚠️ 请替换为你的实际阿里云 AccessKey。请访问阿里云控制台获取：https://console.console.aliyun.com/
> 
> ⚠️ Please replace with your actual Alibaba Cloud AccessKey. Get it from: https://console.console.aliyun.com/

## 启动服务 / Start Service

```bash
# 开发模式 (热更新) / Development mode with hot reload
yarn run start:dev

# 生产模式 / Production mode
yarn run start:prod
```

服务启动后访问 http://localhost:3000

After starting, visit http://localhost:3000

## API 接口 / API Endpoints

### 1. 上传图片 / Upload Image

上传图片到服务器进行 OCR 识别。

Upload image to server for OCR recognition.

```
POST /ocr/upload
Content-Type: multipart/form-data

参数 / Parameter:
  - file: 图片文件 (最大 2MB) / Image file (max 2MB)
```

**示例 / Example:**

```bash
curl -X POST "http://localhost:3000/ocr/upload" -F "file=@your-image.png"
```

**响应 / Response:**

```json
{
  "data": {
    "message": "上传成功 / Upload successful",
    "filePath": "uploads/file-1234567890.png",
    "fileName": "file-1234567890.png"
  },
  "status": 0,
  "success": true,
  "time": 1700000000000
}
```

### 2. 访问上传的文件 / Access Uploaded Files

上传的图片可以通过以下地址访问：

Uploaded images can be accessed at:

```
http://localhost:3000/uploads/文件名
http://localhost:3000/uploads/filename
```

## 项目结构 / Project Structure

```
src/
├── common/
│   └── respInterceptor.ts    # 响应拦截器 / Response interceptor
├── ocr/
│   ├── ocr.controller.ts     # OCR 控制器 / OCR controller
│   ├── ocr.service.ts        # OCR 服务 / OCR service
│   └── ocr.module.ts         # OCR 模块 / OCR module
├── app.module.ts             # 应用模块 / Application module
└── main.ts                   # 入口文件 / Entry file
```

## 技术栈 / Tech Stack

- **NestJS** - Node.js 框架 / Node.js framework
- **TypeScript** - 编程语言 / Programming language
- **Multer** - 文件上传 / File upload
- **阿里云 OCR API** - 文字识别服务 / Text recognition service

## 注意事项 / Notes

1. 上传的图片会保存在 `uploads` 目录下
   - Uploaded images are saved in the `uploads` directory

2. `.env` 文件包含敏感信息，请勿提交到版本控制
   - The `.env` file contains sensitive information, please do not commit to version control

3. 确保 `uploads` 目录存在
   - Make sure the `uploads` directory exists
