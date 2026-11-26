import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { company, navigation } from "@/content/company";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "MNDW | 새벽을 여는", template: "%s | MNDW" },
  description: company.introduction.paragraphs[0],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <a className="skip-link" href="#main">
          본문 바로가기
        </a>
        <Header />
        <main id="main">{children}</main>
        <footer className="footer">
          <div>
            <Link className="footer-brand" href="/">
              MNDW
            </Link>
            <p>새벽을 여는 MNDW</p>
          </div>
          <nav aria-label="하단 메뉴">
            {navigation.map((n) => (
              <Link key={n.slug} href={`/${n.slug}`}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="footer-bottom">
            <small>© MNDW. All rights reserved.</small>
            <a href="#main">맨 위로</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
