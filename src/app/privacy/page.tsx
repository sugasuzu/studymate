import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | Studymate',
  description:
    'Studymateのプライバシーポリシーです。個人情報の取り扱いについて説明しています。',
};

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            プライバシーポリシー
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            最終更新日：2025年9月18日
          </p>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <section>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Studymate（以下、「当サービス」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第1条（個人情報）
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第2条（個人情報の収集方法）
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                当サービスは、ユーザーが利用登録をする際に以下の情報をお尋ねすることがあります。
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>氏名（ハンドルネーム）</li>
                <li>メールアドレス</li>
                <li>年齢</li>
                <li>大学名・学部名</li>
                <li>高校名（任意）</li>
                <li>
                  その他当サービスが定める入力フォームにユーザーが入力する情報
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を、当サービスの提携先（情報提供元、広告主、広告配信先などを含みます。以下、｢提携先｣といいます。）などから収集することがあります。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第3条（個人情報を収集・利用する目的）
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                当サービスが個人情報を収集・利用する目的は、以下のとおりです。
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>本サービスの提供・運営のため</li>
                <li>
                  ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）
                </li>
                <li>
                  ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等及び当サービスが提供する他のサービスの案内のメールを送付するため
                </li>
                <li>
                  メンテナンス、重要なお知らせなど必要に応じたご連絡のため
                </li>
                <li>
                  利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため
                </li>
                <li>
                  ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため
                </li>
                <li>有料サービスにおいて、ユーザーに利用料金を請求するため</li>
                <li>
                  本サービスの改善、新サービスの開発のための統計データを作成するため
                </li>
                <li>上記の利用目的に付随する目的</li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第4条（利用目的の変更）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  当サービスは、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。
                </li>
                <li>
                  利用目的の変更を行った場合には、変更後の目的について、当サービス所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。
                </li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第5条（個人情報の第三者提供）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  当サービスは、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
                  <ol className="list-[lower-alpha] list-inside ml-4 mt-2 space-y-1">
                    <li>
                      人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
                    </li>
                    <li>
                      公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
                    </li>
                    <li>
                      国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
                    </li>
                    <li>
                      予め次の事項を告知あるいは公表し、かつ当サービスが個人情報保護委員会に届出をしたとき
                      <ol className="list-[lower-roman] list-inside ml-4 mt-2 space-y-1">
                        <li>利用目的に第三者への提供を含むこと</li>
                        <li>第三者に提供されるデータの項目</li>
                        <li>第三者への提供の手段または方法</li>
                        <li>
                          本人の求めに応じて個人情報の第三者への提供を停止すること
                        </li>
                        <li>本人の求めを受け付ける方法</li>
                      </ol>
                    </li>
                  </ol>
                </li>
                <li>
                  前項の定めにかかわらず、次に掲げる場合には、当該情報の提供先は第三者に該当しないものとします。
                  <ol className="list-[lower-alpha] list-inside ml-4 mt-2 space-y-1">
                    <li>
                      当サービスが利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
                    </li>
                    <li>
                      合併その他の事由による事業の承継に伴って個人情報が提供される場合
                    </li>
                    <li>
                      個人情報を特定の者との間で共同して利用する場合であって、その旨並びに共同して利用される個人情報の項目、共同して利用する者の範囲、利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について、あらかじめ本人に通知し、または本人が容易に知り得る状態に置いた場合
                    </li>
                  </ol>
                </li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第6条（個人情報の開示）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  当サービスは、本人から個人情報の開示を求められたときは、本人に対し、遅滞なくこれを開示します。ただし、開示することにより次のいずれかに該当する場合は、その全部または一部を開示しないこともあり、開示しない決定をした場合には、その旨を遅滞なく通知します。
                  <ol className="list-[lower-alpha] list-inside ml-4 mt-2 space-y-1">
                    <li>
                      本人または第三者の生命、身体、財産その他の権利利益を害するおそれがある場合
                    </li>
                    <li>
                      当サービスの業務の適正な実施に著しい支障を及ぼすおそれがある場合
                    </li>
                    <li>その他法令に違反することとなる場合</li>
                  </ol>
                </li>
                <li>
                  前項の定めにかかわらず、履歴情報および特性情報などの個人情報以外の情報については、原則として開示いたしません。
                </li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第7条（個人情報の訂正および削除）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  ユーザーは、当サービスの保有する自己の個人情報が誤った情報である場合には、当サービスが定める手続きにより、当サービスに対して個人情報の訂正、追加または削除（以下、「訂正等」といいます。）を請求することができます。
                </li>
                <li>
                  当サービスは、ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の訂正等を行うものとします。
                </li>
                <li>
                  当サービスは、前項の規定に基づき訂正等を行った場合、または訂正等を行わない旨の決定をしたときは遅滞なく、これをユーザーに通知します。
                </li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第8条（個人情報の利用停止等）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  当サービスは、本人から、個人情報が、利用目的の範囲を超えて取り扱われているという理由、または不正の手段により取得されたものであるという理由により、その利用の停止または消去（以下、「利用停止等」といいます。）を求められた場合には、遅滞なく必要な調査を行います。
                </li>
                <li>
                  前項の調査結果に基づき、その請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の利用停止等を行います。
                </li>
                <li>
                  当サービスは、前項の規定に基づき利用停止等を行った場合、または利用停止等を行わない旨の決定をしたときは、遅滞なく、これをユーザーに通知します。
                </li>
                <li>
                  前2項にかかわらず、利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって、ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとれる場合は、この代替策を講じるものとします。
                </li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第9条（Cookie及びアクセス解析ツールについて）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  当サービスは、本サービスの利用状況を把握するため、Cookie及びアクセス解析ツールを利用しています。
                </li>
                <li>
                  Cookieとは、ウェブサイトを利用したときに、ブラウザとサーバーとの間で送受信した利用履歴や入力内容などを、お客様のコンピュータにファイルとして保存しておく仕組みです。
                </li>
                <li>
                  次回、同じページにアクセスすると、Cookieの情報を使って、ページの運営者はお客様ごとに表示を変えたりすることができます。
                </li>
                <li>
                  お客様がブラウザの設定でCookieの送受信を許可している場合、ウェブサイトは、ユーザーのブラウザからCookieを取得できます。
                </li>
                <li>
                  なお、お客様のブラウザは、プライバシー保護のため、そのウェブサイトのサーバーが送受信したCookieのみを送信します。
                </li>
                <li>
                  お客様は、Cookieの送受信に関する設定を「すべてのCookieを許可する」、「すべてのCookieを拒否する」、「Cookieを受信したらユーザーに通知する」などから選択できます。設定方法は、ブラウザにより異なります。Cookieに関する設定方法は、お使いのブラウザの「ヘルプ」メニューでご確認ください。
                </li>
                <li>
                  すべてのCookieを拒否する設定を選択されますと、認証が必要なサービスを受けられなくなる等、インターネット上の各種サービスの利用上、制約を受ける場合がありますのでご注意ください。
                </li>
                <li>
                  当サービスは、本サービスの利用状況を把握するために、Google
                  Analytics、Firebase
                  Analyticsを利用しています。これらのツールでは、Cookieを使用し、個人を特定する情報を含むことなく、ログ情報を収集します。収集された情報は、各ツール提供元のプライバシーポリシーに従って管理されます。
                </li>
                <li>
                  Google Analyticsのプライバシーポリシーは
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline mx-1"
                  >
                    こちら
                  </a>
                  をご確認ください。
                </li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第10条（セキュリティについて）
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                当サービスは、個人情報の正確性及び安全性確保のために、セキュリティに万全の対策を講じています。個人情報は、一般の利用者がアクセスできない安全な環境下に保管しています。また、個人情報の送信時にはSSL（Secure
                Socket
                Layer）による暗号化を行い、第三者による不正アクセスから保護しています。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第11条（未成年者の個人情報について）
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                未成年者が本サービスを利用し、個人情報を入力される場合には、親権者など法定代理人の同意を得た上で行っていただくようお願いいたします。法定代理人の同意を得ずに未成年者から個人情報を取得したことが判明した場合は、速やかに当該個人情報を削除するよう努めます。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第12条（個人情報保護責任者）
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                当サービスにおける個人情報保護責任者は以下の通りです。
              </p>
              <div className="ml-4 mt-2 text-gray-700 dark:text-gray-300">
                <p>個人情報保護責任者：鈴木康浩</p>
                <p>連絡先：お問い合わせフォームよりご連絡ください</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第13条（プライバシーポリシーの変更）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。
                </li>
                <li>
                  当サービスが別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
                </li>
                <li>
                  本ポリシーの変更をする場合、当サービスは、変更後の本ポリシーの施行時期及び内容を本ウェブサイト上での表示その他の適切な方法により周知します。
                </li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第14条（お問い合わせ窓口）
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                本ポリシーに関するお問い合わせは、
                <Link
                  href="/contact"
                  className="text-blue-600 dark:text-blue-400 hover:underline mx-1"
                >
                  お問い合わせフォーム
                </Link>
                よりお願いいたします。
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400">以上</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PrivacyPolicyPage;
