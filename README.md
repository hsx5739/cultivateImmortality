# cultivateImmortality

当前仓库包含“今日养元”系统修炼演示页，以及对应的 OpenSpec 变更文档。

## 主要文件

- `docs/requirements/virtual-companion-prd.md`
- `openspec/changes/build-virtual-companion-demo/`
- `index.html`
- `styles.css`
- `app.js`
- `server.js`

## 本地运行

这个项目现在需要通过本地 Node.js 服务启动，原因有两点：

- 摄像头验证通常要求 `localhost` 或 `https`
- 修为进度会通过后端接口持久化到本地文件

启动方式：

```bash
node server.js
```

启动后打开：

```text
http://localhost:3000
```

## 持久化说明

- 读取进度接口：`GET /api/progress`
- 保存进度接口：`POST /api/progress`
- 本地存储文件：`data/progress.json`

当前实现是单用户、本地文件持久化，适合演示和原型验证。
