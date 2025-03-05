import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const Section: React.FC<{ children: React.ReactNode; title: string }> = (
  props,
) => {
  return (
    <Accordion type="single" collapsible defaultValue="accordion">
      <AccordionItem value="accordion" className="min-w-[350px]">
        <AccordionTrigger className="font-bold">{props.title}</AccordionTrigger>
        <AccordionContent>{props.children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
