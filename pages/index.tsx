
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    seller: "",
    buyer: "たいよう不動産株式会社",
    property: "",
    price: "",
    date: "",
    addressUpdate: false,
    fumei: false,
    zanchi: false,
    extra: "",
  });
  const [contractText, setContractText] = useState("");

  const generate = () => {
    const specials = [];
    if (form.addressUpdate)
      specials.push("売主は、引渡しまでに登記簿上の住所変更登記を行い、その費用は買主が負担する。");
    if (form.fumei) specials.push("本物件は境界非明示とする。");
    if (form.zanchi) specials.push("残置物については買主が撤去するものとする。");
    if (form.extra) specials.push(form.extra);

    const text = `
不動産売買契約書

売主（以下「甲」という。）と買主（以下「乙」という。）は、以下の通り不動産売買契約を締結する。

第1条（売買の目的）
甲は乙に対し、以下の不動産を売渡し、乙はこれを買受ける。
所在地：${form.property}

第2条（売買代金）
売買代金は金${form.price}円とする。

第3条（引渡し）
引渡しは${form.date}とする。

【特約】
${specials.map((s, i) => `${i + 1}. ${s}`).join("\n")}

令和〇年〇月〇日

売主：${form.seller}
買主：${form.buyer}
    `;
    setContractText(text);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>契約書作成フォーム</h1>
      <input placeholder="売主名" value={form.seller} onChange={e => setForm({ ...form, seller: e.target.value })} /><br />
      <input placeholder="物件所在地" value={form.property} onChange={e => setForm({ ...form, property: e.target.value })} /><br />
      <input placeholder="売買代金（例：1000000）" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /><br />
      <input placeholder="引渡し予定日（例：令和7年4月30日）" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /><br />
      <label><input type="checkbox" checked={form.addressUpdate} onChange={() => setForm({ ...form, addressUpdate: !form.addressUpdate })} /> 住所変更登記（費用買主）</label><br />
      <label><input type="checkbox" checked={form.fumei} onChange={() => setForm({ ...form, fumei: !form.fumei })} /> 境界非明示</label><br />
      <label><input type="checkbox" checked={form.zanchi} onChange={() => setForm({ ...form, zanchi: !form.zanchi })} /> 残置物は買主撤去</label><br />
      <textarea placeholder="その他特約" value={form.extra} onChange={e => setForm({ ...form, extra: e.target.value })} /><br />
      <button onClick={generate}>契約書を作成</button>
      <pre>{contractText}</pre>
    </div>
  );
}
