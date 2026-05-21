import { useEffect } from "react";
import { useParams } from "wouter";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { getCaseStudy } from "@/lib/case-study";

export default function CaseStudyPage() {
  const params = useParams<{ slug?: string }>();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  const caseStudy = getCaseStudy(params.slug);
  return <CaseStudyLayout caseStudy={caseStudy} />;
}
