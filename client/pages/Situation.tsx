import { AccordionPage } from "@/components/AccordionPage";

const situationBlocks = [
  {
    id: "block-1",
    title: "عرض الوضعية",
    content: `في نقاش بين زميلين حول عمارة الأرض والوجود الإنساني، أشار محمد إلى أن الإسلام يقدم أروع صورة لعمارة الأرض والإنسان المستخلف في ظل عقيدة التوحيد، بينما يرى سعد أن الحضارة الغربية تمثل النموذج الأفضل بسبب تقدمها المادي والتقني.`,
    isOpen: true,
  },
  {
    id: "block-2",
    title: "صياغة الإشكال",
    content: `ما موقفك من هذين الرأيين؟
هل يكفي التقدم المادي لتحقيق عمارة الأرض؟`,
  },
  {
    id: "block-3",
    title: "أسئلة التوجيه",
    content: `ما موضوع النقاش؟
ما الفرق بين التصورين؟
ما الإشكالية المطروحة؟`,
  },
];

export default function Situation() {
  return (
    <AccordionPage
      title="Situation and Problem"
      arabicTitle="الوضعية المشكلة"
      blocks={situationBlocks}
    />
  );
}
