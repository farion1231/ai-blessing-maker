import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI祝福语生成器",
  description: "使用AI智能生成个性化祝福语，支持多种场景、节日和目标人群选择",
  keywords: "祝福语,AI生成,个性化,节日祝福,生日祝福",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/20 to-orange-500/30"></div>
          <div className="relative z-10 py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-5xl font-black text-center festive-title mb-4">
                🎊 AI祝福语生成器 🎊
              </h1>
              <p className="text-center text-xl font-semibold text-white drop-shadow-lg">
                ✨ 智能生成个性化祝福语，让每一份祝福都独一无二 ✨
              </p>
              <div className="text-center mt-4">
                <span className="inline-block text-3xl animate-bounce">🎉</span>
                <span
                  className="inline-block text-3xl animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                >
                  🎈
                </span>
                <span
                  className="inline-block text-3xl animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                >
                  🎊
                </span>
                <span
                  className="inline-block text-3xl animate-bounce"
                  style={{ animationDelay: "0.6s" }}
                >
                  🎁
                </span>
                <span
                  className="inline-block text-3xl animate-bounce"
                  style={{ animationDelay: "0.8s" }}
                >
                  🎉
                </span>
              </div>
            </div>
          </div>
        </header>
        <main className="py-8 flex-grow">{children}</main>
        <footer className="relative overflow-hidden bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white py-8">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="mb-4">
              <span className="text-2xl">🎊</span>
              <span className="text-2xl mx-2">🎉</span>
              <span className="text-2xl">🎊</span>
            </div>
            <p className="text-lg font-semibold drop-shadow-lg">
              &copy; 2025 AI祝福语生成器 - 让祝福更有温度 🌟
            </p>
            <p className="text-sm mt-2 opacity-90">
              用心生成每一句祝福，传递温暖与快乐 ❤️
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
