import React from 'react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl font-bold text-white mb-6">今すぐ始めよう</h3>
        <p className="text-xl text-white/90 mb-8">
          あなたの志望校の先輩たちが待っています。
          <br />
          信頼できるレビューで、最適な教材を見つけましょう。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg text-lg hover:bg-gray-100 transition transform hover:scale-105">
            無料で始める
          </button>
          <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg text-lg border-2 border-white hover:bg-white/10 transition">
            詳しく見る
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
