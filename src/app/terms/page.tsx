import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '利用規約 | Studymate',
  description:
    'Studymateの利用規約です。本サービスをご利用いただく前に必ずお読みください。',
};

function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            利用規約
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            最終更新日：2025年9月18日
          </p>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <section>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                この利用規約（以下、「本規約」といいます。）は、Studymate（以下、「当サービス」といいます。）がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第1条（適用）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  本規約は、ユーザーと当サービスとの間の本サービスの利用に関わる一切の関係に適用されるものとします。
                </li>
                <li>
                  当サービスは本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
                </li>
                <li>
                  本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めがない限り、個別規定の規定が優先されるものとします。
                </li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第2条（利用登録）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  本サービスにおいては、登録希望者が本規約に同意の上、当サービスの定める方法によって利用登録を申請し、当サービスがこの承認を登録希望者に通知することによって、利用登録が完了するものとします。
                </li>
                <li>
                  当サービスは、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
                  <ol className="list-[lower-alpha] list-inside ml-4 mt-2 space-y-1">
                    <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
                    <li>本規約に違反したことがある者からの申請である場合</li>
                    <li>
                      未成年者、成年被後見人、被保佐人または被補助人のいずれかであり、法定代理人、後見人、保佐人または補助人の同意等を得ていなかった場合
                    </li>
                    <li>
                      その他、当サービスが利用登録を相当でないと判断した場合
                    </li>
                  </ol>
                </li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第3条（ユーザーIDおよびパスワードの管理）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
                </li>
                <li>
                  ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。
                </li>
                <li>
                  当サービスは、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。
                </li>
                <li>
                  ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は、当サービスに故意又は重大な過失がある場合を除き、当サービスは一切の責任を負わないものとします。
                </li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第4条（利用料金および支払方法）
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                本サービスの基本機能は無料でご利用いただけます。将来的に有料機能を追加する場合は、事前に利用料金および支払方法を本サービス上に表示するものとします。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第5条（禁止事項）
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>
                  当サービス、本サービスの他のユーザー、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
                </li>
                <li>当サービスによって得られた情報を商業的に利用する行為</li>
                <li>当サービスのサービスの運営を妨害するおそれのある行為</li>
                <li>不正アクセスをし、またはこれを試みる行為</li>
                <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                <li>不正な目的を持って本サービスを利用する行為</li>
                <li>
                  本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為
                </li>
                <li>他のユーザーに成りすます行為</li>
                <li>
                  当サービスが許諾しない本サービス上での宣伝、広告、勧誘、または営業行為
                </li>
                <li>面識のない異性との出会いを目的とした行為</li>
                <li>
                  当サービスのサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
                </li>
                <li>虚偽のレビューを投稿する行為（サクラレビュー等）</li>
                <li>著作権、商標権その他の知的財産権を侵害する行為</li>
                <li>プライバシー権、肖像権その他の人格権を侵害する行為</li>
                <li>差別的表現、誹謗中傷を含む投稿を行う行為</li>
                <li>その他、当サービスが不適切と判断する行為</li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第6条（投稿コンテンツの取扱い）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  ユーザーは、本サービスに投稿したレビュー、コメントその他のコンテンツ（以下、「投稿コンテンツ」といいます。）について、自らが投稿その他送信することについての適法な権利を有していること、および投稿コンテンツが第三者の権利を侵害していないことについて、当サービスに対し表明し、保証するものとします。
                </li>
                <li>
                  ユーザーは、投稿コンテンツについて、当サービスに対し、世界的、非独占的、無償、サブライセンス可能かつ譲渡可能な使用、複製、配布、派生著作物の作成、表示および実行に関するライセンスを付与します。
                </li>
                <li>
                  当サービスは、投稿コンテンツについて、本サービスの運営、改善、プロモーションに必要な範囲で、複製、改変、公衆送信その他の利用を行うことができるものとします。
                </li>
                <li>
                  ユーザーは、当サービスおよび当サービスから正当にライセンスを受けた者に対して、著作者人格権を行使しないことに同意するものとします。
                </li>
                <li>
                  当サービスは、投稿コンテンツが第5条の禁止事項に該当すると判断した場合、事前通知なく、投稿コンテンツを削除することができるものとします。
                </li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第7条（本サービスの提供の停止等）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  当サービスは、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                  <ol className="list-[lower-alpha] list-inside ml-4 mt-2 space-y-1">
                    <li>
                      本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
                    </li>
                    <li>
                      地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
                    </li>
                    <li>
                      コンピュータまたは通信回線等が事故により停止した場合
                    </li>
                    <li>
                      その他、当サービスが本サービスの提供が困難と判断した場合
                    </li>
                  </ol>
                </li>
                <li>
                  当サービスは、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
                </li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第8条（著作権）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  ユーザーは、自ら著作権等の必要な知的財産権を有するか、または必要な権利者の許諾を得た文章、画像や映像等の情報に関してのみ、本サービスを利用し、投稿ないしアップロードすることができるものとします。
                </li>
                <li>
                  本サービスおよび本サービスに関連する一切の情報についての著作権およびその他の知的財産権はすべて当サービスまたは当サービスにその利用を許諾した権利者に帰属し、ユーザーは無断で複製、譲渡、貸与、翻訳、改変、転載、公衆送信（送信可能化を含みます。）、伝送、配布、出版、営業使用等をしてはならないものとします。
                </li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第9条（利用制限および登録抹消）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  当サービスは、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、投稿データを削除し、ユーザーに対して本サービスの全部もしくは一部の利用を制限しまたはユーザーとしての登録を抹消することができるものとします。
                  <ol className="list-[lower-alpha] list-inside ml-4 mt-2 space-y-1">
                    <li>本規約のいずれかの条項に違反した場合</li>
                    <li>登録事項に虚偽の事実があることが判明した場合</li>
                    <li>
                      決済手段として当該ユーザーが届け出たクレジットカードが利用停止となった場合
                    </li>
                    <li>料金等の支払債務の不履行があった場合</li>
                    <li>当サービスからの連絡に対し、一定期間返答がない場合</li>
                    <li>
                      本サービスについて、最終の利用から一定期間利用がない場合
                    </li>
                    <li>
                      その他、当サービスが本サービスの利用を適当でないと判断した場合
                    </li>
                  </ol>
                </li>
                <li>
                  前項各号のいずれかに該当した場合、ユーザーは、当然に当サービスに対する一切の債務について期限の利益を失い、その時点において負担する一切の債務を直ちに一括して弁済しなければなりません。
                </li>
                <li>
                  当サービスは、本条に基づき当サービスが行った行為によりユーザーに生じた損害について、一切の責任を負いません。
                </li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第10条（退会）
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                ユーザーは、当サービスの定める退会手続により、本サービスから退会できるものとします。退会後は、当該ユーザーの投稿コンテンツは本サービス上に残るものとしますが、ユーザー名は匿名化されます。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第11条（保証の否認および免責事項）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  当サービスは、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを保証するものではありません。
                </li>
                <li>
                  当サービスは、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
                </li>
                <li>
                  当サービスは、本サービスによってユーザーが得る情報の正確性、真実性、確実性、有用性等について、一切保証しません。
                </li>
                <li>
                  当サービスは、ユーザーが本サービスに掲載されたレビューに基づいて購入した教材について、その品質、効果、適合性等について一切の責任を負いません。
                </li>
                <li>
                  当サービスは、本サービスからリンクされた第三者のウェブサイト（アフィリエイトリンク先を含む）について、その内容の正確性、合法性、安全性等について一切の責任を負いません。
                </li>
                <li>
                  当サービスは、本サービスの利用によりユーザーに生じたあらゆる損害について、当サービスの故意又は重過失による場合を除き、一切の責任を負いません。
                </li>
                <li>
                  前項ただし書に定める場合であっても、当サービスは、当サービスの過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当サービスまたはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。
                </li>
                <li>
                  当サービスの過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は、当該ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。本サービスは無料サービスのため、賠償額の上限は0円とします。
                </li>
                <li>
                  消費者契約法の適用その他の理由により、当サービスの損害賠償責任を免責し又は制限する規定にかかわらず当サービスがユーザーに対して損害賠償責任を負う場合においても、当サービスの賠償責任は、ユーザーに現実に生じた直接かつ通常の損害に限るものとします。
                </li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第12条（個人情報の取扱い）
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                当サービスは、本サービスの利用によって取得する個人情報については、当サービス「プライバシーポリシー」に従い適切に取り扱うものとします。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第13条（サービス内容の変更等）
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                当サービスは、ユーザーへの事前の通知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第14条（利用規約の変更）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  当サービスは以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。
                  <ol className="list-[lower-alpha] list-inside ml-4 mt-2 space-y-1">
                    <li>本規約の変更がユーザーの一般の利益に適合するとき</li>
                    <li>
                      本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき
                    </li>
                  </ol>
                </li>
                <li>
                  当サービスはユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。
                </li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第15条（個人情報の取扱い）
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                当サービスは、本サービスの利用によって取得する個人情報については、当サービス
                <Link
                  href="/privacy"
                  className="text-blue-600 dark:text-blue-400 hover:underline mx-1"
                >
                  「プライバシーポリシー」
                </Link>
                に従い適切に取り扱うものとします。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第16条（通知または連絡）
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                ユーザーと当サービスとの間の通知または連絡は、当サービスの定める方法によって行うものとします。当サービスは、ユーザーから、当サービスが別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第17条（権利義務の譲渡の禁止）
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                ユーザーは、当サービスの書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                第18条（準拠法・裁判管轄）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
                <li>
                  本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
                </li>
              </ol>
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

export default TermsPage;
