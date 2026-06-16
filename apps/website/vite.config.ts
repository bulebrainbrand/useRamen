import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 開発サーバーのポート番号を3000に変更
    open: true, // サーバー起動時にブラウザを自動で開く
  },
});
