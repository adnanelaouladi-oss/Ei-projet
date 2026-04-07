import { AccordionPage } from "@/components/AccordionPage";

const analysisBlocks = [
  {
    id: "block-1",
    title: "النصوص الشرعية",
    content: `قال تعالى:
"اجعلني على خزائن الأرض إني حفيظ عليم"

(سورة يوسف، الآية 55)`,
    isOpen: true,
  },
  {
    id: "block-2",
    title: "مضامين النصوص",
    content: `تمكين يوسف عليه السلام في الأرض دليل على أن عمارة الأرض تقوم على العلم والتدبير والإصلاح.

يظهر في هذا النص:
• كفاءة الإنسان المستخلف
• دور العلم في تعمير الأرض
• مسؤولية الإنسان تجاه الموارد`,
  },
  {
    id: "block-3",
    title: "تفكيك المفاهيم",
    content: `ما معنى الاستخلاف؟
→ تكليف من الله بحماية وتطوير الأرض

ما دور العلم؟
→ أداة أساسية لفهم قوانين الكون والعمل بحكمة

ما علاقة الإيمان بالعمل؟
→ الإيمان يوجه العمل نحو الخير والإصلاح`,
  },
];

export default function Analysis() {
  return (
    <AccordionPage
      title="Analysis and Texts"
      arabicTitle="التحليل والنصوص"
      blocks={analysisBlocks}
    />
  );
}
