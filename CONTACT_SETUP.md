# 联系表单配置指南

## 方案1：Formspree（推荐 - 最简单）

### 优点
- ✅ 完全免费（每月50次提交）
- ✅ 无需后端代码
- ✅ 直接发送到你的邮箱
- ✅ 5分钟配置完成
- ✅ 支持垃圾邮件过滤

### 配置步骤

1. **注册账号**
   - 访问：https://formspree.io/
   - 使用你的邮箱注册（建议用 17616160861@163.com）

2. **创建表单**
   - 登录后点击 "New Form"
   - 输入表单名称：Portfolio Contact Form
   - 会生成一个表单ID，格式类似：`xpznabcd`

3. **替换代码**
   - 打开 `index.html`
   - 找到第 183 行：`action="https://formspree.io/f/YOUR_FORM_ID"`
   - 把 `YOUR_FORM_ID` 替换成你的表单ID
   - 例如：`action="https://formspree.io/f/xpznabcd"`

4. **测试**
   - 提交一次测试留言
   - 第一次需要确认邮箱
   - 之后所有留言都会发到你邮箱

---

## 方案2：EmailJS（免费额度更高）

### 优点
- ✅ 每月200次免费
- ✅ 可自定义邮件模板
- ✅ 支持多个邮箱

### 配置步骤

1. **注册**：https://www.emailjs.com/
2. **添加邮件服务**（如Gmail/163邮箱）
3. **创建邮件模板**
4. **获取三个ID**：
   - Service ID
   - Template ID  
   - Public Key

5. **修改代码**（我可以帮你改）

---

## 方案3：使用 Web3Forms

### 优点
- ✅ 完全免费无限制
- ✅ 无需注册
- ✅ 只需一个Access Key

### 配置步骤

1. 访问：https://web3forms.com/
2. 输入你的邮箱获取 Access Key
3. 在表单中添加隐藏字段：
```html
<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
```

---

## 方案4：自建后端（最复杂）

如果你想要完全控制，可以：
- 使用 Node.js + Express + Nodemailer
- 部署到 Vercel/Railway 等平台
- 需要编写后端代码

---

## 推荐选择

**如果你只是想快速上线** → 用 Formspree（方案1）
**如果需要更多自定义** → 用 EmailJS（方案2）
**如果想完全免费** → 用 Web3Forms（方案3）

## 当前状态

代码已经配置为使用 Formspree，你只需要：
1. 去 https://formspree.io/ 注册
2. 创建表单获取ID
3. 替换 index.html 中的 `YOUR_FORM_ID`

就这么简单！
