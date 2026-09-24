import { PageShell } from "@/components/page-shell";

// Privacy, Terms, and Accessibility. No legal text is written here: each page holds a clear
// placeholder until PMG supplies reviewed text, and stays noindex until then.
export function LegalPending({ path }: { path: string }) {
  return (
    <PageShell path={path} eyebrow="Pain Management Group">
      <section className="container-shell section-space">
        <div className="max-w-2xl rounded-[22px] border border-[#e7d6ac] bg-[#fbf6ea] p-8 text-[#6b4f10]">
          <h2 className="text-2xl text-[#6b4f10]">
            Legal text pending PMG review.
          </h2>
          <p className="mt-4">
            This page will publish the text Pain Management Group approves.
            Nothing here is a policy or agreement yet.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
