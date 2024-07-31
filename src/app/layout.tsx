import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { TaskModalProvider } from "@/context/modal";
import { AuthProvider } from "@/context/auth";
import { KanbanBoardProvider } from "@/context/kanbanBoard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workflo!",
  description: "Task Management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <KanbanBoardProvider>
            <TaskModalProvider>
              <AntdRegistry>{children}</AntdRegistry>
            </TaskModalProvider>
          </KanbanBoardProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
