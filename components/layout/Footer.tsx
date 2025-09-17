import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Studymate
            </h4>
            <p className="text-sm">
              志望大学・取得資格で絞り込める、信頼性の高い教材レビューサイト
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4">サービス</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  教材を探す
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  レビューを投稿
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  大学別ランキング
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4">サポート</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  使い方ガイド
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  よくある質問
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  お問い合わせ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4">法的情報</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  利用規約
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  特定商取引法
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2025 Studymate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
