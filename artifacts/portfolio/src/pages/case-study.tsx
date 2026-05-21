import { useEffect } from "react";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { SAMPLE_CASE_STUDY } from "@/lib/case-study";

export default function CaseStudyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <CaseStudyLayout caseStudy={SAMPLE_CASE_STUDY} />;
}
